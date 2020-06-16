import React from "react";
import $ from "jquery";

function ListenRow(props) {

    function playAdd() {

        var audio = document.getElementById("audio1");

        audio.setAttribute("src", props.url);
        audio.play();
    }

    function stopAdd() {
        var audio = document.getElementById("audio1");

        audio.pause();
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
        <td>{props.duration}</td>
        <td>{props.date}</td>
        <td><button onClick={playAdd} className="btn table-button btn-primary">Play</button></td>
        <td><button onClick={stopAdd} className="btn table-button btn-primary">Stop</button></td>
        <td><button onClick={submitRightAdd} className="btn table-button btn-success">OK</button></td>
        <td><button onClick={submitWrongAdd} className="btn table-button btn-danger">Not OK</button></td>
    </tr>
}

export default ListenRow;