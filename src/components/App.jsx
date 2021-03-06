import React, { useState, useEffect } from 'react';
import useInterval from "./useInterval";
import ListenRow from "./ListenRow";
import CompareRow from "./CompareRow";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import $ from "jquery";
import WaveSurfer from "wavesurfer.js";

function App() {

    const [listenData, setListenData] = useState([]);
    const [compareData, setCompareData] = useState([]);

    const [number, setNumber] = useState(20);

    const [audio1, setAudio1] = useState({});
    const [audio2, setAudio2] = useState({});

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
    
        useEffect(() => {

            var waveSurfer1 = WaveSurfer.create({
                barWidth: 3,
                cursorWidth: 1,
                container: "#waveform1",
                height: 80,
                waveColor: '#09ceff',
                progressColor: 'blue',
                responsive: true,
                cursorColor: "purple"
            });

            var waveSurfer2 = WaveSurfer.create({
                barWidth: 3,
                cursorWidth: 1,
                container: "#waveform2",
                height: 80,
                waveColor: '#09ceff',
                progressColor: 'blue',
                responsive: true,
                cursorColor: "purple"
            });

            setAudio1(waveSurfer1);
            setAudio2(waveSurfer2);

        }, [1])

        function play(player) {
            player.play();
        }

        function stop(player) {
            player.pause();
        }
        
    return <div>

        <Tabs defaultActiveKey="listen-ad" id="uncontrolled-tab-example">

            <Tab eventKey="listen-ad" title="Listen Ad">
                <p>Please check each ad and determine if the quality of it is OK.  Then, click OK or Not OK to remove it from the checking queue.</p>
                <h2 id="title">Player</h2>
                <button onClick={function(){play(audio1)}} className="player-btn btn btn-primary">Play</button>
                <button onClick={function(){stop(audio1)}} className="player-btn btn btn-primary">Stop</button>
                <div className="wavediv" id="waveform1"></div>

                <div className="table-div">
                    <table>
                        <tbody>
                            <tr>    
                                <td></td>
                                <td>Name</td>
                                <td>Duration</td>
                                <td>Date</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {listenData.map((item, index) => (
                                <ListenRow
                                    key={item.pksid}
                                    id={item.pksid}
                                    number={index}
                                    duration={item.duration}
                                    title={item.title}
                                    date={item.created}
                                    url={item.url}
                                    audio={audio1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Tab>

            <Tab eventKey="compare-ad" title="Compare Ad">
                <p>Compare Old bad ad with new version of the same ad and check it for quality. Use OK button to mark new version of ad as good.</p>
                <h2 id="title2">Player</h2>
                <button onClick={function(){play(audio2)}} className="player-btn btn btn-primary">Play</button>
                <button onClick={function(){stop(audio2)}} className="player-btn btn btn-primary">Stop</button>
                <div className="wavediv" id="waveform2"></div>

                <audio preload="auto" id="audio2"></audio>
                <div className="table-div">
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Name</td>
                                <td>Duration</td>
                                <td>Date</td>
                                <td>Old Ad</td>
                                <td>New Ad</td>
                                <td></td>
                            </tr>
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
                                    audio={audio2}
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