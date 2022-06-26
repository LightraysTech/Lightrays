/*
This is an example App to show the functionalities of Lightrays. To use it, replace
the <App /> tag with <ExampleApp /> in the index.tsx file.
*/

import './Lightrays/style/css/style.css';

import * as Nav from './Lightrays/components/LRNav';
import * as LRFunctions from "./Lightrays/scripts/LRFunctions";

import logo from './Lightrays/img/logo.png';
import navSide_Light from './Lightrays/img/navSide_Light.png';
import navSide_Dark from './Lightrays/img/navSide_Dark.png';

import React, { CSSProperties, ReactChild, ReactChildren, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import * as ReactDOMServer from 'react-dom/server';

function ExampleApp() {
  LRFunctions.setBackgroundColor(LRFunctions.BackgroundColors.night);

  //JSX
  return (
    <BrowserRouter>
      <Nav.LRNav type={Nav.NavTypes.side} className={"floating"}>
        <Nav.Header>
          <Nav.Icon className='fluentIcon'><img src={logo} width={"30px"} /></Nav.Icon>
          <Nav.Label>Lightrays examples</Nav.Label>
        </Nav.Header>

        <Nav.Group>
          <Nav.Item to="/">
            <Nav.Label>Discover Lightrays</Nav.Label>
            <Nav.Icon></Nav.Icon>
          </Nav.Item>
          <Nav.Item>
            <Nav.Label>Usage</Nav.Label>
            <Nav.Icon></Nav.Icon>
          </Nav.Item>
          <Nav.Foldout open>
            <Nav.Label>Components</Nav.Label>
            <Nav.Icon></Nav.Icon>

              <Nav.Item to="/components/navigation">
                <Nav.Label>Navigation</Nav.Label>
                <Nav.Icon className='fluentNav.Nav.Icon'></Nav.Icon>
              </Nav.Item>
            <Nav.Item>
              <Nav.Label>Inputs</Nav.Label>
              <Nav.Icon className='fluentNav.Nav.Icon'></Nav.Icon>
            </Nav.Item>
            <Nav.Item>
              <Nav.Label>Lists & Boxes</Nav.Label>
              <Nav.Icon className='fluentNav.Nav.Icon'></Nav.Icon>
            </Nav.Item>
          </Nav.Foldout>

          <Nav.Item>
            <Nav.Label>Give Feedback!</Nav.Label>
            <Nav.Icon></Nav.Icon>
          </Nav.Item>

        </Nav.Group>

        <Nav.Content>
          <Nav.LRNav type={Nav.NavTypes.bottom} style={{ "--width": "500px", "--height": "50px", "margin": "10px" }}>

            <Nav.Item className={"active"}><Nav.Label>Floating</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Label>Normal</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Label>Flat</Nav.Label></Nav.Item>

            <Nav.Content scroll>
              <div style={{ padding: "0 30px 0 20px" }}>
                <Routes>
                  <Route path='' element={<WhatIsLighrays/>} />
                  <Route path='/components/navigation' element={<ComponentsNavigation />} />
                </Routes>
              </div>
            </Nav.Content>

          </Nav.LRNav>
        </Nav.Content>
      </Nav.LRNav>
    </BrowserRouter>
  );
}

let WhatIsLighrays = () => {
  return (
    <>
      <h1 style={h1Style}>A New World.</h1>
      <div style={{display: "flex", flexDirection: "column", flex: 1, alignItems: "center  "}}>
        <p style={{width: "800px", maxWidth: "100%", lineHeight: "1.5em", fontSize: "1.05em"}}>
          Lightrays is a lightweight, ultra-responsive web design framework. Inspired from real-life lighting, 
          Lightrays was created to ensure it fits in the world and nature around us. The framework is intended to help developing 
          websites and web-apps without having to care about design, device-compability or layout. Lightrays comes with different themes, 
          inputs, navigation systems, and other layout components like boxes and windows. It has strong React support, 
          but you can also use it without any framework.  
        </p>
        <p><button style={{padding: " 10px 15px 10px 15px"}}><Link to="/components/navigation" className={"noStyle"}>Show examples</Link></button></p>
      </div>
    </>
  );
}

let ComponentsNavigation = () => {
  let navItems = (
    <>
      <Nav.Group>
        <Nav.Item className={"active"}>
          <Nav.Label>Menu</Nav.Label>
          <Nav.Icon></Nav.Icon>
        </Nav.Item>
        <Nav.Item>
          <Nav.Label>MenuItem 2</Nav.Label>
          <Nav.Icon></Nav.Icon>
        </Nav.Item>
      </Nav.Group>

      <Nav.Foldout>
        <Nav.Label>MenuItem Foldout</Nav.Label>
        <Nav.Icon></Nav.Icon>
        <Nav.Item>
          <Nav.Label>SubMenuItem</Nav.Label>
          <Nav.Icon className='fluentNav.Nav.Icon'></Nav.Icon>
        </Nav.Item>
        <Nav.Item>
          <Nav.Label>SubMenuItem Foldout</Nav.Label>
          <Nav.Icon></Nav.Icon>
        </Nav.Item>
      </Nav.Foldout>
    </>
  );

  let navItemsSimple = (<>
    <Nav.Item>
      <Nav.Label>Menu</Nav.Label>
      <Nav.Icon></Nav.Icon>
    </Nav.Item>
    <Nav.Item className={"active"}>
      <Nav.Label>MenuItem 2</Nav.Label>
      <Nav.Icon></Nav.Icon>
    </Nav.Item>
    <Nav.Item>
      <Nav.Label>MenuItem 3</Nav.Label>
      <Nav.Icon></Nav.Icon>
    </Nav.Item>
  </>
  );

  const codeSnippets = {
    nav: {
      side: (<Nav.LRNav type={Nav.NavTypes.side} className={"floating"}>{navItems}</Nav.LRNav>),
      sideRight: (<Nav.LRNav type={Nav.NavTypes.side} className={"floating right"}>{navItems}</Nav.LRNav>),
      bottom: (<Nav.LRNav type={Nav.NavTypes.bottom} className={"floating"}>{navItemsSimple}</Nav.LRNav>),
      top: (<Nav.LRNav type={Nav.NavTypes.top} className={"floating"}>{navItemsSimple}</Nav.LRNav>)
    }
  }


  const [currentComponent, setCurrentComponent] = useState(codeSnippets.nav.side);

  function handleNavBoxTypeEvent(component: any, e: React.MouseEvent<HTMLDivElement>) {
    setCurrentComponent(component);

    let parent = e.currentTarget.parentElement;
    if (parent) {
      console.log(parent.children);
      for (let c = 0; c < parent.children.length; c++) {
        parent.children[c].classList.remove("active")
      }
    }
    e.currentTarget.classList.add("active");
  }

  return (
    <>
        <h1 style={h1Style} >Navigation</h1>

        <h3>Navigation Types</h3>
        <div style={{ display: "flex", justifyContent: "space-between", overflowX: "auto" }}>
          <div className='lr-imageBox very-round-corners animated active' style={boxStyle} onClick={e => handleNavBoxTypeEvent(codeSnippets.nav.side, e)}>
            <h3>Side</h3>
            <img src={navSide_Dark}/>
          </div>
          <div className='lr-imageBox very-round-corners animated' style={boxStyle} onClick={e => handleNavBoxTypeEvent(codeSnippets.nav.sideRight, e)}>
            <h3>Side (Right)</h3>
            <img src={navSide_Dark}/>
          </div>
          <div className='lr-imageBox very-round-corners animated' style={boxStyle} onClick={e => handleNavBoxTypeEvent(codeSnippets.nav.bottom, e)}>
            <h3>Top</h3>
            <img src={navSide_Dark}/>
          </div>
          <div className='lr-imageBox very-round-corners animated' style={boxStyle} onClick={e => handleNavBoxTypeEvent(codeSnippets.nav.top, e)}>
            <h3>Bottom</h3>
            <img src={navSide_Dark}/>
          </div>
        </div>

        <div style={{ display: "flex", marginTop: "30px" }}>

          <div style={{ flex: "1 1 50%", marginRight: "10px", minWidth: "200px" }} >
            <h3>Code</h3>
            <div className='lr-box' style={{ height: "100%", overflowY: "scroll" }}><code>{ReactDOMServer.renderToString(currentComponent)}</code></div>
          </div>

          <div style={{ flex: "1 1 50%", marginLeft: "10px", minWidth: "200px" }}>
            <h3>Preview</h3>
            <div className='lr-box' style={{ height: "100%", overflowY: "scroll" }}>{currentComponent}</div>
          </div>

        </div>
      </>
  );
}

  //Style
  const h1Style: CSSProperties = {
    padding: '20px 0 20px 0',
    textAlign: 'center',
    color: 'var(--foreground)',
    zIndex: 2
  }

  const boxStyle: CSSProperties = { flex: "1 1 250px", margin: "10px", minWidth: "150px" }


export default ExampleApp;