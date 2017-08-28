# html-template
A html template based on Node.js

Your template is :
``` html
<% if (username) { %>
    <h1>Hello <%=  username  %>!</h1>
    <p>username = <%=  username  %></p>
    <% for (var i = 0; i < username.length; i ++) { %>
        <p><%= username[i] %><p>
    <% } %>
<% } else { %>
    <h1>Hello, someone!</h1>
<% } %>
```

and your data is :
``` json
{"username": "zphhhhh"}
```

run `node render.js zph.html` and it will print:
``` html
    <h1>Hello zphhhhh!</h1>
    <p>username = zphhhhh</p>
            <p>z<p>
            <p>p<p>
            <p>h<p>
            <p>h<p>
            <p>h<p>
            <p>h<p>
            <p>h<p>

```