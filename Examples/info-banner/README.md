## Web Components (Samples): Info Banner

![Static Badge](https://img.shields.io/badge/Uses%20HTML5-%23525252?style=plastic&logo=html5&logoColor=%2333bbff&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)
![Static Badge](https://img.shields.io/badge/Uses%20CSS3-%23525252?style=plastic&logo=css3&logoColor=%2333CC33&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)
![Static Badge](https://img.shields.io/badge/Uses%20Javascript-%23525252?style=plastic&logo=javascript&logoColor=%23ffd633&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)

![Static Badge](https://img.shields.io/badge/Tested%20with%20Google%20Chrome-%23525252?style=plastic&logo=googlechrome&logoColor=%23DFDFDF&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)


This example is a bit more complex. This time we will create a component that also has its own properties. This example creates the following component:

```
<info-banner color="#BFBFBF" position="top" message="Hello, Web Components!"></info-banner>
```

This component has three properties:
**color**, **position** and **message**

**color**
This property determines the background color of the banner.<br>A HEX value must always be specified here!

**position**
As the name suggests, the position of the banner can be determined here.<br>This property only knows '*top*' or '*bottom*'

**message**
Here we can specify the text that should be displayed on our banner.<br>Anything that is a normal string will be displayed.

