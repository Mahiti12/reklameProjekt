import React from "react";
import $ from "jquery";
import WaveSurfer from "wavesurfer.js";

function CompareRow(props) {

    var wavesurfer = props.audio;

    function displayPlayer(input) {
        document.getElementById("waveform2").style.display = "block";
        document.getElementById("title2").innerHTML = props.title + input;
        document.getElementById("title2").style.display = "block";
        var buttons = document.getElementsByClassName("player-btn2");
        for(var i = 0; i <= 1; i++) {
            buttons[i].style.display = "inline-block";
        }
    }

    function playAd1() {
        displayPlayer(" - OLD AD");

        wavesurfer.load(props.oldUrl);
        wavesurfer.on('ready', function () {
            wavesurfer.play();
        });
    }

    function playAd2(event) {
        var buttons = document.getElementsByClassName("new-ad-btn");

        for(var i = 0; i< buttons.length; i++) {
            buttons[i].innerHTML = "Wait...";
            buttons[i].disabled = true;
        }

        displayPlayer(" - NEW AD");

        wavesurfer.load(props.newUrl);
        wavesurfer.on('ready', function () {
            for(var i = 0; i< buttons.length; i++) {
                buttons[i].innerHTML = "Play new ad";
                buttons[i].disabled = false;
            }
            wavesurfer.play();
        });
        
        // wavesurfer.addEventListener("loadeddata", (event) => {
            
        // });
    }

    function submitAd() {
        var url = "http://access4.streamsink.com/PkDb.AdKontrol/PkDbAccessJS.ashx?op=TagSong&pksid=" + props.id + "&tagName=workingAd"
        $("#" + props.id).fadeOut(1000, function() {
            $.get(url);
        });
    }

    return <tr id={props.id}>
        <td>{props.number}</td>
        <td>{props.title}</td>
        <td>{props.duration}</td>
        <td>{props.date}</td>
        <td><button onClick={playAd1} className="btn table-button btn-primary">View old ad in player</button></td>
        <td><button onClick={playAd2} className="btn table-button btn-secondary new-ad-btn">View new ad in player</button></td>
        <td><button onClick={submitAd} className="btn table-button btn-success">New Ad is OK</button></td>
    </tr>
}

export default CompareRow;