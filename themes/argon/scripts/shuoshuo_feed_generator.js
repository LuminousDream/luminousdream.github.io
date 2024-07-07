hexo.extend.generator.register('shuoshuo_atom', function(locals) {
    if(!this.theme.config.shuoshuo_atom.enable){return;}
    const shuoshuo_array = [];
    let count = 0;
    hexo.locals.get('posts').sort("date", -1).forEach(shuoshuo => {
        if (count < this.theme.config.shuoshuo_atom.limit) {
            if(shuoshuo.type == "shuoshuo"){
                shuoshuo_array.push([shuoshuo.title.replace(/&/g, '&amp;'),shuoshuo.path,shuoshuo.date.toISOString(),shuoshuo.updated.toISOString(),shuoshuo.content])
                count++;
            }
        }
      });
    var shuoshuo_updated = shuoshuo_array[0][3];
    var atom_data = `
    <feed xmlns="http://www.w3.org/2005/Atom">
        <title>`+this.theme.config.shuoshuo_atom.atom_title+`</title>
        <subtitle>`+this.theme.config.shuoshuo_atom.atom_subtitle+`</subtitle>
        <link href="`+this.config.url+this.theme.config.shuoshuo_atom.atom_entry+`" rel="self"/>
        <link href="`+this.config.url+`"/>
        <updated>`+shuoshuo_updated+`</updated>
        <id>`+this.config.url+`</id>
        <author>`+this.config.author+`</author>
    `

    shuoshuo_array.forEach(shuoshuo => {
        atom_data += `<entry>
            <title>`+shuoshuo[0]+`</title>
            <link href="`+this.config.url+"/"+shuoshuo[1]+`"/>
            <id>`+this.config.url+"/"+shuoshuo[1]+`</id>
            <published>`+shuoshuo[2]+`</published>
            <updated>`+shuoshuo[3]+`</updated>
            <content type="html">
                <![CDATA[ `+shuoshuo[4]+` ]]>
            </content>
        </entry>
        `
    });

    atom_data += `</feed>`
    return {path: this.theme.config.shuoshuo_atom.atom_entry, data: atom_data}
});