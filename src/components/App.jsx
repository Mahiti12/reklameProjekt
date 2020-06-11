import React, { useState } from 'react';
import useInterval from "./useInterval";
import ListenRow from "./ListenRow";
import CompareRow from "./CompareRow";
import TableHeader from "./TableHeader";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import $ from "jquery";

function App() {

    const [listenData, setListenData] = useState([]);
    const [compareData, setCompareData] = useState([]);
    const [number, setNumber] = useState(20);

    var listenUrl = "http://access4.streamsink.com/PkDb.AdKontrol/PkDbAccessJS.ashx?op=GetDeletedAds&limit=" + number;
    var compareUrl = "http://access4.streamsink.com/PkDb.AdKontrol/PkDbAccessJS.ashx?op=GetWrongCutAds&limit=" + number;

    function sendGet() {

        $.ajax({url: listenUrl, success: function(data) {
            setListenData(data);
        }});
    
        $.ajax({url: compareUrl, success: function(data) {
            setCompareData(data);
        }});
    }

    useInterval(() => {
        sendGet();
    }, 1000);

    function handleChange(event) {
        const value = event.target.value;
        setNumber(value);
    }

    return <div>

        <Tabs defaultActiveKey="listen-ad" id="uncontrolled-tab-example">

            <Tab eventKey="listen-ad" title="Listen Ad">
                <input value={number} onChange={handleChange} placeholder="Broj reklama:"></input>
                <div className="table-div">
                    <table>
                        <tbody>     
                            <TableHeader />
                            {listenData.map((item, index) => (
                                <ListenRow
                                    key={item.pksid}
                                    id={item.pksid}
                                    number={index}
                                    duration={item.duration}
                                    title={item.title}
                                    date={item.created}
                                    url={item.url}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Tab>

            <Tab eventKey="compare-ad" title="Compare Ad">
                <input value={number} onChange={handleChange} placeholder="Broj reklama:"></input>
                <div className="table-div">
                    <table>
                        <tbody>
                            <td></td>
                            <td>Naziv</td>
                            <td>Trajanje</td>
                            <td>Datum</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {compareData.map((item, index) => (
                                <CompareRow 
                                    key={item.pksid}
                                    id={item.pksid}
                                    number={index}
                                    duration={item.duration}
                                    title={item.title}
                                    date={item.created}
                                    oldUrl={item.url}
                                    newUrl={item.url2}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Tab>

        </Tabs>  

    </div>
}

export default App;