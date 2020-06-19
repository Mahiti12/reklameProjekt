import React from "react";
import $ from "jquery";
import WaveSurfer from "wavesurfer.js";

function ListenRow(props) {

    var wavesurfer = props.audio;
    var date = props.date;
    date = date.replace("-", ".");
    date = date.replace("-", ".");
    date = date.replace("T", " ");

    function setAd() {
        wavesurfer.load(props.url);
        wavesurfer.on('ready', function () {
            wavesurfer.play();
        });

        document.getElementById("title").innerHTML = props.title;
    }

    function submitRightAdd() {
        var url = "http://access4.streamsink.com/PkDb.AdKontrol/PkDbAccessJS.ashx?op=TagSong&pksid=" + props.id + "&tagName=rightAdd"
        $("#" + props.number).fadeOut(1000, function() {
            $.get(url);
        });
    }

    function submitWrongAdd() {
        var url = "http://access4.streamsink.com/PkDb.AdKontrol/PkDbAccessJS.ashx?op=TagSong&pksid=" + props.id + "&tagName=wrongAdd"
            $("#" + props.number).fadeOut(1000, function() {
            $.get(url);
        });
    }

    return <tr id={props.number}>
        <td>{props.number}</td>
        <td>{props.title}</td>
        <td className="duration">{props.duration.toFixed(2)}</td>
        <td>{date}</td>
        <td><button onClick={setAd} className="btn table-button btn-primary">To player</button></td>
        <td><button onClick={submitRightAdd} className="btn table-button btn-success">OK</button></td>
        <td><button onClick={submitWrongAdd} className="btn table-button btn-danger">Not OK</button></td>
    </tr>
}

export default ListenRow;