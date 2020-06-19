import React from "react";
import $ from "jquery";
import WaveSurfer from "wavesurfer.js";

function CompareRow(props) {

    var wavesurfer = props.audio;
    var date = props.date;
    date = date.replace("-", ".");
    date = date.replace("-", ".");
    date = date.replace("T", " ");

    function playAd1() {
        document.getElementById("title2").innerHTML = props.title + "<span> OLD AD</span>";

        wavesurfer.load(props.oldUrl);
        wavesurfer.on('ready', function () {
            wavesurfer.play();
        });
    }

    function playAd2(event) {
        document.getElementById("title2").innerHTML = props.title + "<span> NEW AD</span>";

        var buttons = document.getElementsByClassName("new-ad-btn");

        for(var i = 0; i< buttons.length; i++) {
            buttons[i].innerHTML = "Wait...";
            buttons[i].disabled = true;
        }

        wavesurfer.load(props.newUrl);
        wavesurfer.on('ready', function () {
            for(var i = 0; i< buttons.length; i++) {
                buttons[i].innerHTML = "To player";
                buttons[i].disabled = false;
            }
            wavesurfer.play();
        });
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
        <td className="duration">{props.duration.toFixed(2)}</td>
        <td>{date}</td>
        <td><button onClick={playAd1} className="btn table-button btn-primary">To player</button></td>
        <td><button onClick={playAd2} className="btn table-button btn-secondary new-ad-btn">To player</button></td>
        <td><button onClick={submitAd} className="btn table-button btn-success">OK</button></td>
    </tr>
}

export default CompareRow;
