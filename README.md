# [Hootsuite Design](https://hootsuite.s3.amazonaws.com/jsapi/1-0/app_stream_template.html)

## Install

```
$ npm install hootsuite-react --save
```

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar, Messages, Input } from 'hootsuite-react';

function click() { alert('Clicked'); }

ReactDOM.render(
  <div>
    <TopBar title="Title">
      <menu name="ellipses" title="More">
          <span className="icon-app-dir x-ellipsis"></span>
          <li className="hs_dropdownMenuListItem"><a target="_blank" href="https://hootsuite.s3.amazonaws.com/jsapi/1-0/app_stream_template.html">Hootsuite CSS theme for apps</a></li>
      </menu>
    </TopBar>
    <Messages>
      <msg>
        <Input id="someField" label="someLabel"  />
      <msg>
    </Messages>
  </div>
, document.body);
```

