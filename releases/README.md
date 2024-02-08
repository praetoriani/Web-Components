<h1 align="center"> Web Component Release Information </h3>
<p align="center">
<img src="../assets/web-components-logo.svg" width="240px">
</p>

Here is an overview of all released web components (in alphabetical order). This <code>README.md</code> only shows the latest releases of the web components as well as release and compatibility informations about these components. There is also a direct link for each web component where you can download the latest version as a zip-file.
<br><br>
If you are looking for a previous version of a web component, please look inside the related subfolder inside this releases folder. Each web components has its own subfolder. Those subfolders contain all released versions of the related web component.
<br><br>
<strong>Please note</strong><br>
<font color="#CC3030">I only support and maintain the latest release of a web component.<br>
If you decide using an old version you should keep in mind that they are no longer supported/maintained.</font>
<br><br>
<strong>Usage instructions:</strong><br>
Each released/published web component has its own directory here in the release folder. Within this subfolder there is a <code>README.md</code> file for each web component. There you can find corresponding instructions and information for the respective web component.
<br><br>

| Symbol | Explanation |
| :-- | :-- |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/status-stable.svg" width="16"> | The stable release of the web component has been successfully tested  and can be used<br> on the specified browser (no known bugs/issues at the time of release).
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/status-remark.svg" width="16"> | The stable release of the web component has been tested on the specified browser.<br>However there is minimum one remark you should read before using the component on the specified browser
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/status-failed.svg" width="16"> | The web component has either not been tested on the specified browser or has been tested<br>but is classified as "<i>not working/do not use</i>"

<br><br>

## Badge Widget

|||
|:-|-:|
|Last Update:    |                  02.02.2024|
|Current version:|                    v1.00.16|
|Release Date:   |                  03.02.2024|
|File:           |   badge-widget-v1.00.16.zip|
|Size:           |                 8.952 Bytes|
|Download:       |[badge-widget-v1.00.16.zip](https://github.com/praetoriani/web-components/raw/main/releases/badge-widget/badge-widget-v1.00.16.zip)|

<br>

| Browser Name &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Version used for testing &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Compatibility Check |
|:--|:-:|--:|
| Chrome | 121.0.6167.140 | <img src="../assets/status-stable.svg" width="16"> |
| Edge | 121.0.2277.98 | <img src="../assets/status-stable.svg" width="16"> |
| Opera One | 106.0.4998.70 | <img src="../assets/status-stable.svg" width="16"> |
| Firefox | 122.0 | <img src="../assets/status-remark.svg" width="16"> |
| Safari | &nbsp; | <img src="../assets/status-failed.svg" width="16"> |

<br>

<strong>Release note for Firefox:</strong><br>
For some reason I don't understand, Firefox seems to have problems with spaces " " when the component renders the text/code from the slots. There is a simple solution here: Instead of spaces (i.e. " ") simply use the corresponding HTML entity (i.e. <code>\&nbsp;</code>). Here's an example: You want the text “<code>web components are cool</code>” to appear on the badge widget in the “badgetext” slot. Then you have to format the text for Firefox as follows: "<code>web\&nbsp;components\&nbsp;are\&nbsp;cool</code>". Each white space must be replaced by <code>\&nbsp;</code>. I'm going to fix this issue in the next release.

<br><br>

## Simple Popup

|||
|:-|-:|
|Last Update:    |                  02.02.2024|
|Current version:|                    v1.00.16|
|Release Date:   |                  03.02.2024|
|File:           |   simple-popup-v1.00.16.zip|
|Size:           |                 6.520 Bytes|
|Download:       |[simple-popup-v1.00.16.zip](https://github.com/praetoriani/web-components/raw/main/releases/simple-popup/simple-popup-v1.00.16.zip)|

<br>

| Browser Name &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Version used for testing &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Compatibility Check |
|:--|:-:|--:|
| Chrome | 121.0.6167.140 | <img src="../assets/status-stable.svg" width="16"> |
| Edge | 121.0.2277.98 | <img src="../assets/status-stable.svg" width="16"> |
| Opera One | 106.0.4998.70 | <img src="../assets/status-stable.svg" width="16"> |
| Firefox | 122.0 | <img src="../assets/status-stable.svg" width="16"> |
| Safari | &nbsp; | <img src="../assets/status-failed.svg" width="16"> |

<br>

<strong>General note:</strong><br>
This web component uses shadows. Depending on the browser, these shadows are displayed differently. This can cause the rounded corners to look slightly pixelated in some browsers. But this effect is limited and is only slightly visible. The supposedly incorrect display of the shadow effects is not an issue caused by the component itself but rather a browser behavior that I cannot influence.

<br><br>

## Tooltip Popup

|||
|:-|-:|
|Last Update:    |                  02.02.2024|
|Current version:|                    v1.00.16|
|Release Date:   |                  03.02.2024|
|File:           |  tooltip-popup-v1.00.16.zip|
|Size:           |                 6.578 Bytes|
|Download:       |[tooltip-popup-v1.00.16.zip](https://github.com/praetoriani/web-components/raw/main/releases/tooltip-popup/tooltip-popup-v1.00.16.zip)|

<br>

| Browser Name &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Version used for testing &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Compatibility Check |
|:--|:-:|--:|
| Chrome | 121.0.6167.140 | <img src="../assets/status-stable.svg" width="16"> |
| Edge | 121.0.2277.98 | <img src="../assets/status-stable.svg" width="16"> |
| Opera One | 106.0.4998.70 | <img src="../assets/status-stable.svg" width="16"> |
| Firefox | 122.0 | <img src="../assets/status-remark.svg" width="16"> |
| Safari | &nbsp; | <img src="../assets/status-failed.svg" width="16"> |

<br>

<strong>Release note for Firefox:</strong><br>
Somehow there is a problem with the CSS properties regarding the tooltip pointer. The position of the pointer is displayed incorrectly. And that messes up the layout a bit. You may either see a very thin line between the pointer and the popup text, or the blunt end of the pointer extends too far into the rest of the popup (depending on the height you assign to the tooltip). At the moment I haven't found a solution that works for Chrome/Edge and Firefox. Therefore I cannot recommend using the Badge Widget with Firefox. If you still want to use the component, you do so at your own risk

<br>


