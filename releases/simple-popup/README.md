## Simple Popup Information

## Preview
<p align="left">
<img src="../../assets/preview-simple-popup.png" width="602px">
</p>
<br>

## Details

|  |  |
|:-|-:|
|Web Component ID: &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Simple Popup|
|Last Update: &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; 02.02.2024|
|Current Version: &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; v1.00.16|
|Current Status: &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; stable|
|Released Version: &nbsp;&nbsp;&nbsp; |  &nbsp;&nbsp;&nbsp; v1.00.16|

<br>

| Browser Name &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Version used for testing &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Compatibility Check |
|:--|:-:|--:|
| Chrome | 121.0.6167.140 | <img src="../../assets/status-stable.svg" width="16"> |
| Edge | 121.0.2277.98 | <img src="../../assets/status-stable.svg" width="16"> |
| Opera One | 106.0.4998.70 | <img src="../../assets/status-stable.svg" width="16"> |
| Firefox | 122.0 | <img src="../../assets/status-stable.svg" width="16"> |
| Safari | &nbsp; | <img src="../../assets/status-failed.svg" width="16"> |

<br>

## Known Bugs/Issues
<br>
<strong>General information:</strong><br>
This component uses various CSS properties for the design. Rounded edges, shadows and glossy effects are used here. These styles are interpreted differently (depending on the browser). In some browsers it can happen that the edges/borders look slightly pixelated in connection with the shadow effect. This behavior is not an error caused by the component, but is a behavior of the browser that I cannot influence.

<br>

## Simple Popup Usage Instructions

<strong>Prerequisites:</strong><br>
To use this web component, you have to make sure, that the javascript file <code>simple-popup.js</code> and the css file <code>simple-popup.css</code> are both in the same directory. Then you have to add the Javascript fie to the header of you html file

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Popup</title>
    <!-- ADD THIS LINE TO YOUR HEADER -->
    <script src="simple-popup.js"></script>
</head>
<body>

</body>
</html>
```

After adding the Javascript you can use the web component by adding following code to the html file:

```html
<simple-popup popupid="MyPopup" size="400x200" viewmode="hidden">
    <span slot="popupheadtext" class="YOUR-CSS-CLASS">
        THIS IS YOUR HEADER TEXT
    </span>
    <span slot="popupbodytext" class="YOUR-CSS-CLASS">
        THIS IS THE CONTENT TEXT
    </span>
    <span slot="popupbuttontext" class="YOUR-CSS-CLASS">
        THIS IS THE BUTTON TEXT
    </span>
</simple-popup>
```
<br>

### Explanation/Instruction of the attributes:
<br>
<code>popupid</code>&nbsp;&nbsp;&nbsp;(required)
<br>
This attribute assigns an unique id to the instance of your component. You have to add this to handle the visibiliy of the popup. If you want to interact with the instance of your component, you can do this with the following javascript code:<br><br>

```javascript
document.querySelector('simple-popup').shadowRoot.getElementById('YOUR-POPUPID')
```

This line will point on the html element inside the shadow DOM.<br>
But the component also has a function to handle the visibility of the popup:

```javascript
document.querySelector('simple-popup').UpdateViewMode('YOUR-POPUPID','STATUS');
```

The <code>UpdateViewMode()</code> function has two params.<br>
The first param is your unique <code>popupid</code><br>
The second param sets the <code>viewmode</code> of your popup and can either be <code>visible</code> or <code>hidden</code>
<br><br><br>
<code>size</code>&nbsp;&nbsp;&nbsp;(required)
<br>
Here you can set the size of the popup. But please note that the value of this attribute must always be in the form NUMBERxNUMBER (<code>200x300</code> or <code>400x240</code>). The first number determines the <code>width</code> and the second number determines the <code>height</code> of the popup. It is also important that you do not specify any units here (i.e. no <i>px</i> or <i>vw</i> or <i>vh</i> or anything similar).
<br><br><br>
<code>viewmode</code>&nbsp;&nbsp;&nbsp;(required)
<br>
This will set the initial visibility of your popup. This attribute only accepts <code>visible</code> or <code>hidden</code> as value. Please not: I recommend using <code>hidden</code> as the initial state and changing the visibility with the <code>UpdateViewMode()</code> function afterwards. If you use <code>visible</code> for the initial state of the popup, it will be visible as soon as the page has been rendered by the browser.
<br><br>

### Explanation/Instruction of the slots:
<br>
The Simple Popup has the following three named slots:
<br><br>
<code>popupheadtext</code>&nbsp;&nbsp;&nbsp;(required)
<br>
In this slot you can write your text/code for the header.
<br><br>
<code>popupbodytext</code>&nbsp;&nbsp;&nbsp;(required)
<br>
This slot ist for the content of the popup. Put your text/code for the body here.
<br><br>
<code>popupbuttontext</code>&nbsp;&nbsp;&nbsp;(required)
<br>
This slot represents the button area of the popup. The text/code for the button goes here.
<br><br>
To implement those slots into the Simple Popup, you have to add <code>&lt;span&gt;</code> tags to the component (look at the code at the top). All three slots have to be added to the component. Otherwise the component can't be built correctly by the javascript and therefore it will not work without these slots. You can use your own font styles by simply adding the <code>class='...'</code> attribute to the  <code>&lt;span&gt;</code> tags. 
<br><br><br>

**Please read the following information, if you want to use your own css class:**
<br>
The Javascript (which builds the component) only allows changes to the following css properties:<br>
<i>font-family</i> , <i>font-weight</i> , <i>font-style</i> , <i>font-size</i> , <i>color</i><br>
All other css properties will be ignored.

## Important note about using the component
<code>

YOU ARE USING THESE FILES/SCRIPTS AT YOUR OWN RISK.
YOU DECIDE FOR YOURSELF WHERE AND HOW YOU WANT TO
USE THIS COMPONENT. YOU ARE RESPONSIBLE FOR ANY
CONSEQUENCES THAT MAY RESULT FROM THE USE OF THIS
WEB COMPONENT.

I AM NOT RESPONSIBLE OR LIABLE FOR ANY PROBLEMS,
MALFUNCTIONS, ERRORS OR OTHER DISASTERS THAT MAY
BE CAUSED BY USING THESE FILES IN YOUR PROJECTS.

THESE FILES WERE PUBLICATED UNDER THE MIT LICENSE

</code>