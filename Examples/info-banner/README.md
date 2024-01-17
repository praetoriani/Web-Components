## Web Components (Samples): Info Banner

![Static Badge](https://img.shields.io/badge/Uses%20HTML5-%23525252?style=plastic&logo=html5&logoColor=%2333bbff&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)
![Static Badge](https://img.shields.io/badge/Uses%20CSS3-%23525252?style=plastic&logo=css3&logoColor=%2333CC33&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)
![Static Badge](https://img.shields.io/badge/Uses%20Javascript-%23525252?style=plastic&logo=javascript&logoColor=%23ffd633&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)

![Static Badge](https://img.shields.io/badge/Tested%20with%20Google%20Chrome-%23525252?style=plastic&logo=googlechrome&logoColor=%23DFDFDF&label=%20&labelColor=%23525252&link=https%3A%2F%2Fgithub.com%2Fpraetoriani)


This example is a bit more complex.<br>This time we will create a component that also has its own properties.<br><br>
In the end, we will have a component that looks something like the following code:
<br><br>

```html
<info-banner color="#BFBFBF" position="top" message="Hello, Web Components!"></info-banner>
```
<br>
As you can see, this component has three properties:
<br>

**color**, **position** and **message**

<br>

**color**<br>
This property determines the background color of the banner.<br>A HEX value must always be specified here!

**position**<br>
As the name suggests, the position of the banner can be determined here.<br>This property only knows '*top*' or '*bottom*'

**message**<br>
Here we can specify the text that should be displayed on our banner.<br>Anything that is a normal string will be displayed.

<br>

The *Info Banner Example* has three files:
- <code>info-banner.html</code><br>
  Demo Code that shows the component
- <code>info-banner.css</code><br>
  Includes the whole CSS-Code
- <code>info-banner.js</code><br>
  Includes the whole Javascript-Code

<br>

Just look at the code, download the example and play around with it.
