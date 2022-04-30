/*
This is an example App to show the functionalities of Lightrays. To use it, replace
the <App /> tag with <ExampleApp /> in the index.tsx file.
*/

import './Lightrays/style/css/style.css';

import * as Nav from './Lightrays/components/LRNav';
import * as LRFunctions from "./Lightrays/scripts/LRFunctions";

function ExampleApp() {
  LRFunctions.setBackgroundLight(LRFunctions.LightTimes.day);

  return (
    <div className='App'>
      <Nav.LRNav type={Nav.NavTypes.side} mobileType={Nav.NavTypes.side} className={"floating"}>
        <Nav.Group>
          <Nav.Item className={"selected"}>
            <Nav.Label>Hallo</Nav.Label>
            <Nav.Icon></Nav.Icon>
          </Nav.Item>
          <Nav.Item>
            <Nav.Label>MenuItem 2</Nav.Label>
            <Nav.Icon></Nav.Icon>
          </Nav.Item>
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

              <Nav.Item>
                <Nav.Label>SubSubMenuItem</Nav.Label>
                <Nav.Icon></Nav.Icon>
              </Nav.Item>
            </Nav.Item>
          </Nav.Foldout>

          <Nav.Item>
            <Nav.Label>MenuItem 4</Nav.Label>
            <Nav.Icon></Nav.Icon>
          </Nav.Item>

        </Nav.Group>

        <Nav.Content>
          <Nav.LRNav type={Nav.NavTypes.bottom} className={""} style={{"--width": "600px", "--height": "50px", "margin-bottom": "10px"}}>
            <Nav.Item className={"selected"}><Nav.Icon></Nav.Icon><Nav.Label>Alle</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Icon></Nav.Icon><Nav.Label>Einzukaufen</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Icon></Nav.Icon><Nav.Label>Suche</Nav.Label></Nav.Item>

            <Nav.Content>
              <h1 style={{padding: "20px 0 0 0", width: "100%" }}>Lightrays example app</h1>
              <div className='lr-box'>LR Box</div>
            </Nav.Content>

          </Nav.LRNav>
        </Nav.Content>
      </Nav.LRNav>
    </div>
  );
}

export default ExampleApp;