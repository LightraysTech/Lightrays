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
      <Nav.LRNav type={Nav.NavTypes.side} className={"floating"} style={{marginRight:"30px"}}>
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
          <Nav.LRNav type={Nav.NavTypes.bottom} style={{"--width": "600px", "--height": "50px", "margin-bottom": "10px"}}>
            <Nav.Item className={"selected"}><Nav.Icon></Nav.Icon><Nav.Label>Alle</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Icon></Nav.Icon><Nav.Label>Einzukaufen</Nav.Label></Nav.Item>
            <Nav.Item><Nav.Icon></Nav.Icon><Nav.Label>Suche</Nav.Label></Nav.Item>

            <Nav.Content scroll>
              <h1 style={{padding: "20px 0 20px 0", width: "100%", textAlign: "center", color: "var(--foreground)" }}>Lightrays example app</h1>
              <div className='lr-list' style={{width: "calc(100% - 30px)", height: "500px"}}>
                <div>Todo 1</div>
                <div>Todo 2</div>           
                <div>Todo 3</div>
                <div>Todo 4</div>
                <div>Todo 5</div>
                <div>Todo 6</div>
                <div>Todo 7</div>
                <div>Todo 8</div>
                <div>Todo 9</div>
                <div>Todo 10</div>
                <div>Todo 11</div>
                <div>Todo 12</div>
                <div>Todo 13</div>
                <div>Todo 14</div>
                <div>Todo 15</div>
                <div>Todo 16</div>
                <div>Todo 17</div>
                <div>Todo 18</div>
                <div>Todo 19</div>
              </div>
            </Nav.Content>

          </Nav.LRNav>
        </Nav.Content>
      </Nav.LRNav>
    </div>
  );
}

export default ExampleApp;