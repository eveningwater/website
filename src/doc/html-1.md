# HTML简介

[HTML(HyperText Markup Language)](https://baike.baidu.com/item/HTML/97049?fr=aladdin) 超文本标记语言,是一种创建网页标准的语言。你可以使用html语言来建立自己的[web](https://baike.baidu.com/item/web/150564?fr=aladdin)站点,将这门语言运行在浏览器上,就由浏览器来解析并运行。

它是由上个世纪90年代由欧洲核子研究中心的物理学家[蒂姆·伯纳斯-李（Tim Berners-Lee）](https://baike.baidu.com/item/%E8%92%82%E5%A7%86%C2%B7%E4%BC%AF%E7%BA%B3%E6%96%AF%C2%B7%E6%9D%8E/8868412?fromtitle=%E8%92%82%E5%A7%86%C2%B7%E4%BC%AF%E7%BA%B3%E6%96%AF%EF%BC%8D%E6%9D%8E&fromid=1413501&fr=aladdin)发明。它的最大特点就是支持超链接，可以跳转到其他网页，从而构成了整个互联网。1999年，HTML4.01版发布，成为广泛接受的HTML标准。2014年，HTML5发布，这是目前正在使用的版本。

提起浏览器的网页开发，涉及三种技术：HTML、CSS和JavaScript。HTML语言定义网页的结构和内容，CSS样式表定义网页的样式，JavaScript语言定义网页与用户的互动行为。

浏览器访问网站，其实就是从服务器下载 HTML代码，然后渲染出网页。

# HTML基本文档结构
## HTML基本文档结构介绍

既然HTML是一种标记语言,所以HTML就是由标签(Tag)来组成。HTML的基本文档结构也就由一个根节点`<!DOCTYPE html>`和一个HTML标签组成。如以下一个示例:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>网页标题</title>
</head>
<body>
    网页的内容
</body>
</html>
```

在一个html文档中,标签是不区分大小写的,但是为了提高可读性,所以还是建议小写为主。先来解释一下以上各个标签代表的含义: