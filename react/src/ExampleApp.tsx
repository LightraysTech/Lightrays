/*
This is an example App to show the functionalities of Lightrays. To use it, replace
the <App /> tag with <ExampleApp /> in the index.tsx file.
*/

import './Lightrays/style/css/style.css';

import * as Nav from './Lightrays/components/LWDNav';
import * as LWDFunctions from "./Lightrays/scripts/LWDFunctions";

function ExampleApp() {
  LWDFunctions.setBackgroundLight(LWDFunctions.LightTimes.day);

  return (
    <div className='App'>
      <Nav.LWDNav type={Nav.NavTypes.side} mobileType={Nav.NavTypes.side} className={"floating right"}>
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
          <Nav.LWDNav type={Nav.NavTypes.top} className={""} style={{"--width": "600px", "--height": "50px"}}>
            <Nav.Item className={"selected"}><Nav.Icon></Nav.Icon><Nav.Label>Alle</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Icon></Nav.Icon><Nav.Label>Einzukaufen</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Icon></Nav.Icon><Nav.Label>Suche</Nav.Label></Nav.Item>

            <Nav.Content>
              <h1 style={{paddingTop: "20px", textAlign: "center", width: "100%" }}>React with Spring Boot Tutorial</h1>
            </Nav.Content>

          </Nav.LWDNav>
        </Nav.Content>
      </Nav.LWDNav>
    </div>
  );
}

export default ExampleApp;