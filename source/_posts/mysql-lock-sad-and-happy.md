---
title: 「随心说」用生活的方式浅谈 MySQL 的悲观锁与乐观锁
tags:
  - MySQL
  - 随心说
categories:
  - - 技术分享
  - - 暗梦 の 随心说
abbrlink: 740c95d7
date: 2023-08-17 21:01:40
---
### First. 前言
各位旅行者们，你们好，又是我，你们的都市看客兼吟游诗人暗梦 o(*≧▽≦)ツ
em...... 最近又不知道写什么文章了啦 [梦之无奈]  [╮（﹀_﹀）╭]
~~还是随便写点吧，或许，也算是换一种方式表达吧~~，这次暗梦我用生活的方式讲解一下 MySQL 的悲观锁与乐观锁哈，诶嘿~

### I.浅谈 MySQL 数据库的情绪 の 悲观锁
> 暗梦：em...... 猫粮又用完了啦，好吧，得出门去买猫粮咯~
> [此时，暗梦来到喵喵宠物店，准备买猫粮，不过此时，出现了一点小插曲... *(悲观锁图解：)* ]

![悲观锁比喻图解](/static/20230817_14528.webp)

em...... 悲观锁的概念也正如其名字所言，它的概念嘛，也可以说是担心数据库
被并发修改的机率很大，所以在操作之前会先加锁，然后等待操作完毕之后再释放锁，再进行后续操作。
> *Tip: 当然，在没有释放行锁的情况下，同样不可以再次添加相同的行锁。*
> 另外，除了可以给数据库的行加锁之外，还可以给整个数据表加锁，或者读写锁。

那么这是如何实现的呢？好吧，其实是通过这段 SQL 语句添加行锁：
> ***Tip: 因为 MySQL 默认使用 autocommit 模式，每一次执行更新之后都会自动提交，所以需要在先前键入命令 set autocommit=0 关闭 autocommit 模式。***
```sql
select [计数数据表列名称] from [数据表结构名称] where id = [数据 ID 值] for update
```
> **Tip: 暗梦我在这里提醒下旅行者们哈，如果上述命令没有 `where id = [数据 ID 值]` 这个参数，则执行的并非添加行锁，而是添加整个数据表的表锁。**

然后键入 `begin` 命令开始执行事务，执行完毕之后键入 `commit` 命令释放悲观锁 & 结束事务，根据上述图解举个例子 *(Tip: 下列命令需要在事务中执行，实际使用需要根据情况修改哈~)* ：
```sql
update miaomiao_petstore_items set 库存 = 库存 - 1 where id="U01-A"
```

>暗梦：em......
> 如此一来，金枪鱼猫粮的库存就没有了，没办法，暗梦我只能选择别的猫粮。
> 除了 MySQL 之外嘛，在 Java 也可以通过 syncronized 关键字实现悲观锁。

```java
public class Database {
    private String data;

    /*
     * 模拟数据库读写操作
     * (Tip: 因为函数中有 syncronized 关键字，所以只能有一个线程调用。)
    */
    public synchronized void readData() {
        System.out.println("读取数据：" + data);
    }

    public synchronized void writeData(String newData) {
        System.out.println("写入数据：" + newData);
        this.data = newData;
    }
}

public class Main {
    public static void main(String[] args) {
        final Database database = new Database();

        //定义数据库模拟读写线程
        Thread readerThread = new Thread(new Runnable() {
            @Override
            public void run() {
                database.readData();
            }
        });

        Thread writerThread = new Thread(new Runnable() {
            @Override
            public void run() {
                database.writeData('人生如戏，故事如诗。');
            }
        });

        // 启动数据库模拟读写线程 (正如上述所说的关键字，因此这两个线程是依次在调用。)
        readerThread.start();
        writerThread.start();
    }
}
```

### II.浅谈 MySQL 数据库的情绪 の 乐观锁
乐观锁的概念和悲观锁完全相反，当然，暗梦我这么说吧，乐观锁则不会对数据加锁
它的实现方式则是数据库中，在更新数据的时候对其 version 值作出比对 *(Tip: 各位旅行者们可以参考一下 CAS)*
>Tip: 当提交 version 与原先的 version 不一致的时候，修改就会失效。
> *em...... 从严格意义上而言，乐观锁本身也不算一种锁，毕竟其没有任何锁的参与嘛。*
它并不担心数据被并发修改，但仍然会通过指定行 version 列的数据判断数据是否被修改，针对于整个数据表。

em......
暗梦我来以我友链的旅行者们做个假设，假如 [@Qeem](https://itstarqeem.space) 想买一台搭载 M2 芯片的 MacBook Air，则会出现下列的流程 *(乐观锁图解:)* 。

![乐观锁比喻图解](/static/20230817_20344.webp)

### III.悲观锁和乐观锁的特点
| 数据库锁名称 | 优点 | 缺点 | 适用场景
| ---- | ---- | ---- | ---- |
| 悲观锁 | 可以在较大程度保护数据安全，防止被并发修改。 | 如果队列很多，后续的事务太多，会导致系统资源 & 并发性能的损耗。| 及其容易被并发修改的情况，且数据库需要频繁修改 & 更新的话。 |
| 乐观锁 | 在处理之前不会对数据加锁，且可以节省系统资源 & 并发性能，除非在更新数据的时候比对 version 值 *(Tip: 除了 version 值以外也可以比对 UNIX 时间戳)* 。| 虽然乐观锁有一定的安全性，但也容易出现被并发修改的现象 *(Tip: 毕竟乐观锁也只是在更新数据的时候才会进行比对嘛)* 。| 多读少写，且能保证数据安全的情况下，以避免悲观锁占用系统资源 & 并发性能的弊端。|

总而言之嘛，暗梦我这么说吧：
安全性： 悲观锁 > 乐观锁
资源节省性： 悲观锁 < 乐观锁

{% note 'default' 'Tip' 'fa fa-info-circle' %}
<i>虽说二者不可得兼，<strong>但还是希望各位旅行者们记得要养成数据安全的习惯哈~</strong></i>
{% endnote %}

### Last. 结语
em...... 这本来是讲 MySQL 的两种锁机制的，但暗梦我做为都市看客兼吟游诗人嘛，还是要在心灵上说几句话给旅行者们：
> 悲观锁，犹如一名沉默的守护者，而对幻想之地所眷恋，他为了数据的安全，时刻警惕着在必要事务之外的一切，只为守护自己 & 他人心中的那片幻想之地。
> 而乐观锁则犹如一名勇者，他相信很多人都是友善的，因此他也信任着他们，但他仍然拥有属于自己的一个原则，用于甄别事物。

{% note 'default' 'Tip' 'fa fa-info-circle' %}
但不论如何，暗梦我还是希望旅行者们能够在守护身边人的时候，同时也给予一些善良 & 友爱哈，诶嘿~<br>
em...... 还是 <a style="color:#ffffff;" target="blank" href="https://vinking.top">@Vinking</a> 曾经说过的那句话：<strong>“愿你永怀善意，清澈明朗。”</strong><br>
Oray，暗梦我得去喂猫猫啦，亲爱的旅行者们，再会~
{% endnote %}