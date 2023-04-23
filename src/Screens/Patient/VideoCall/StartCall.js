import React, { useState, useEffect } from 'react';
import AgoraRTC, { localAudioTrack, localVideoTrack } from "agora-rtc-sdk-ng";
import Grid from "@material-ui/core/Grid";

function Main() {

    useEffect(() => {
        // Update the document title using the browser API
        startBasicCall();
    });

    var isSharingEnabled = false;
    var isMuteVideo = false;
    var isMuteAudio = false;

    let options =
    {
        // Pass your App ID here.
        appId: 'bc36cdf5e58d40cda2eaf8a2f4422141',
        // Set the channel name.
        channel: 'aimedis-test',
        // Pass your temp token here.
        token: '007eJxTYPhubPvk15qiH7vWsj2qnmghas61562pz9mnsv8+qG/f+N1cgSEp2dgsOSXNNNXUIsXEIDkl0Sg1Mc0i0SjNxMTIyNDEMOD1jeSGQEaG0txwJkYGCATxeRgSM3NTUzKLdUtSi0sYGABgGCWa',
        // Set the user ID.
        uid: 0,
    };

    let channelParameters =
    {
        // A variable to hold a local audio track.
        localAudioTrack: null,
        // A variable to hold a local video track.
        localVideoTrack: null,
        // A variable to hold a remote audio track.
        remoteAudioTrack: null,
        // A variable to hold a remote video track.
        remoteVideoTrack: null,
        // A variable to hold the remote user id.s
        remoteUid: null,
    };

    const startBasicCall = (a) => {
        // Create an instance of the Agora Engine

        const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        // Dynamically create a container in the form of a DIV element to play the remote video track.
        const localPlayerContainer = document.createElement('div');
        localPlayerContainer.className = "checkvideo1";
        const remotePlayerContainer = document.createElement("div");
        remotePlayerContainer.className = "checkvideo2";
        // Dynamically create a container in the form of a DIV element to play the local video track.


        // Specify the ID of the DIV container. You can use the uid of the local user.
        localPlayerContainer.id = options.uid;
        // Set the textContent property of the local video container to the local user id.
        localPlayerContainer.textContent = "Local user " + options.uid;
        // Set the local video container size.
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        localPlayerContainer.style.padding = "15px 5px 5px 5px";
        // Set the remote video container size.
        remotePlayerContainer.style.width = "640px";
        remotePlayerContainer.style.height = "480px";
        remotePlayerContainer.style.padding = "15px 5px 5px 5px";
        // Listen for the "user-published" event to retrieve a AgoraRTCRemoteUser object.

        // Set an event listener on the range slider.



        agoraEngine.on("user-published", async (user, mediaType) => {
            AgoraRTC.onAutoplayFailed = () => {
                // Create button for the user interaction.
                const btn = document.createElement("button");
                // Set the button text.
                btn.innerText = "Click me to resume the audio/video playback";
                // Remove the button when onClick event occurs.
                btn.onClick = () => {
                    btn.remove();
                };
                // Append the button to the UI.
                document.body.append(btn);
            }

            // document.getElementById("myButton").addEventListener("change", function (evt) {
            //     console.log("Volume of local audio :" + evt.target.value);
            //     if (evt.value == "YES") {
            //         channelParameters.localAudioTrack.setVolume(parseInt("100"));
            //         evt.value = "NO";
            //     }
            //     else if (evt.value == "NO") {
            //         channelParameters.localAudioTrack.setVolume(parseInt("0"));
            //         evt.value = "YES";
            //     }
            //     // Set the local audio volume.

            // });
            // document.getElementById("localAudioVolume").addEventListener("change", function (evt) {
            //     console.log("Volume of local audio :" + evt.target.value);
            //     // Set the local audio volume.
            //     channelParameters.localAudioTrack.setVolume(parseInt(evt.target.value));
            // });
            // // Set an event listener on the range slider.
            // document.getElementById("remoteAudioVolume").addEventListener("change", function (evt) {
            //     console.log("Volume of remote audio :" + evt.target.value);
            //     // Set the remote audio volume.
            //     channelParameters.remoteAudioTrack.setVolume(parseInt(evt.target.value));
            // });
            AgoraRTC.onMicrophoneChanged = async (changedDevice) => {
                // When plugging in a device, switch to a device that is newly plugged in.
                if (changedDevice.state === "ACTIVE") {
                    localAudioTrack.setDevice(changedDevice.device.deviceId);
                    // Switch to an existing device when the current device is unplugged.
                } else if (changedDevice.device.label === localAudioTrack.getTrackLabel()) {
                    const oldMicrophones = await AgoraRTC.getMicrophones();
                    oldMicrophones[0] && localAudioTrack.setDevice(oldMicrophones[0].deviceId);
                }
            }

            AgoraRTC.onCameraChanged = async (changedDevice) => {
                // When plugging in a device, switch to a device that is newly plugged in.
                if (changedDevice.state === "ACTIVE") {
                    localVideoTrack.setDevice(changedDevice.device.deviceId);
                    // Switch to an existing device when the current device is unplugged.
                } else if (changedDevice.device.label === localVideoTrack.getTrackLabel()) {
                    const oldCameras = await AgoraRTC.getCameras();
                    oldCameras[0] && localVideoTrack.setDevice(oldCameras[0].deviceId);
                }
            }
            // Subscribe to the remote user when the SDK triggers the "user-published" event.
            await agoraEngine.subscribe(user, mediaType);
            console.log("subscribe success");
            // Subscribe and play the remote video in the container If the remote user publishes a video track.
            if (mediaType == "video") {
                // Retrieve the remote video track.
                channelParameters.remoteVideoTrack = user.videoTrack;
                // Retrieve the remote audio track.
                channelParameters.remoteAudioTrack = user.audioTrack;
                // Save the remote user id for reuse.
                channelParameters.remoteUid = user.uid.toString();
                // Specify the ID of the DIV container. You can use the uid of the remote user.
                remotePlayerContainer.id = user.uid.toString();
                channelParameters.remoteUid = user.uid.toString();
                remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                // Append the remote container to the page body.
                var getRemote = document.getElementById('id13')
                document.body.append(remotePlayerContainer);
                // Play the remote video track.
                channelParameters.remoteVideoTrack.play(remotePlayerContainer);
            }
            // Subscribe and play the remote audio track If the remote user publishes the audio track only.
            if (mediaType == "audio") {
                // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
                channelParameters.remoteAudioTrack = user.audioTrack;
                // Play the remote audio track. No need to pass any DOM element.
                channelParameters.remoteAudioTrack.play();
                console.log("channelParameters", channelParameters)
            }
            // Listen for the "user-unpublished" event.
            agoraEngine.on("user-unpublished", user => {
                console.log(user.uid + "has left the channel");
            });
        });


        // Listen to the Join button click event.
        if (a == "join") {
            // Join a channel.
            agoraEngine.join(options.appId, options.channel, options.token, options.uid);
            // Create a local audio track from the audio sampled by a microphone.
            channelParameters.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
            // Create a local video track from the video captured by a camera.
            channelParameters.localVideoTrack = AgoraRTC.createCameraVideoTrack();
            // Append the local video container to the page body.
            console.log(document.body, 'document')
            var getLocal = document.getElementById('id12')
            console.log("agoraEngine", agoraEngine,
                "channelParameters.localVideoTrack", channelParameters.localVideoTrack,
                "channelParameters.localAudioTrack", channelParameters.localAudioTrack);
            getLocal.append(localPlayerContainer);
            // Publish the local audio and video tracks in the channel.
            agoraEngine.publish([channelParameters.localAudioTrack, channelParameters.localVideoTrack]);
            console.log("agoraEngine", agoraEngine)
            // Play the local video track.
            if (channelParameters.localVideoTrack) {
                channelParameters.localVideoTrack.play(localPlayerContainer);
            }
            console.log("publish success!");
        }
        // Listen to the Leave button click event.
        if (a == "inItScreen") {


            if (isSharingEnabled == false) {
                // Create a screen track for screen sharing.
                channelParameters.screenTrack = AgoraRTC.createScreenVideoTrack();
                // Stop playing the local video track.
                channelParameters.localVideoTrack = agoraEngine.stop();
                // Unpublish the local video track.
                agoraEngine.unpublish(channelParameters.localVideoTrack);
                // Publish the screen track.
                agoraEngine.publish(channelParameters.screenTrack);
                // Play the screen track on local container.
                channelParameters.screenTrack.play(localPlayerContainer);
                // Update the button text.
                document.getElementById(`inItScreen`).innerHTML = "Stop Sharing";
                // Update the screen sharing state.
                isSharingEnabled = true;
            } else {
                // Stop playing the screen track.
                channelParameters.screenTrack.stop();
                // Unpublish the screen track.
                agoraEngine.unpublish(channelParameters.screenTrack);
                // Publish the local video track.
                agoraEngine.publish(channelParameters.localVideoTrack);
                // Play the local video on the local container.
                channelParameters.localVideoTrack = agoraEngine.play(localPlayerContainer);
                // Update the button text.
                document.getElementById(`inItScreen`).innerHTML = "Share Screen";
                // Update the screen sharing state.
                isSharingEnabled = false;
            }
        }

        if (a == "muteVideo") {

            if (isMuteVideo == false) {
                // Mute the local video.
                channelParameters.localVideoTrack.setEnabled(false);
                // Update the button text.
                document.getElementById(`muteVideo`).innerHTML = "Unmute Video";
                isMuteVideo = true;
            } else {
                // Unmute the local video.
                channelParameters.localVideoTrack.setEnabled(true);
                // Update the button text.
                document.getElementById(`muteVideo`).innerHTML = "Mute Video";
                isMuteVideo = false;
            }
        }

        if (a == "muteAudio") {

            if (isMuteAudio == false) {
                // Mute the local video.

                channelParameters.localAudioTrack.setVolume(parseInt("0"));

                // Update the button text.
                document.getElementById(`muteAudio`).innerHTML = "Unmute Audio";
                isMuteAudio = true;
            } else {
                // Unmute the local video.

                channelParameters.localAudioTrack.setVolume(parseInt("100"));

                // Update the button text.
                document.getElementById(`muteAudio`).innerHTML = "Mute Audio";
                isMuteAudio = false;
            }
        }



        if (a == "leave") {

            // Destroy the local audio and video tracks.
            channelParameters.localAudioTrack = agoraEngine.close();
            channelParameters.localVideoTrack = agoraEngine.close();
            // Remove the containers you created for the local video and remote video.
            removeVideoDiv(remotePlayerContainer.id);
            removeVideoDiv(localPlayerContainer.id);
            // Leave the channel
            agoraEngine.leave();
            console.log("You left the channel");
            // Refresh the page for reuse
            window.location.reload();
        }
    };




    // startBasicCall();
    // Remove the video stream from the container.
    function removeVideoDiv(elementId) {
        console.log("Removing " + elementId + "Div");
        let Div = document.getElementById(elementId);
        if (Div) {
            Div.remove();
        }
    };

    //  function Buttontoggle() {
    //     var t = document.getElementById("myButton");
    //     if (t.value == "100") {
    //         channelParameters.localAudioTrack.setVolume(parseInt(0));
    //         t.value = "0";
    //     }
    //     else if (t.value == "0") {
    //         channelParameters.localAudioTrack.setVolume(parseInt(100));
    //         t.value = "100";
    //     }
    // }

    return (
        <div className="App">
            <div className="Content">

                <h2 className="left-align">Get started with video calling</h2>
                <div className="row">
                    <div>
                        <button type="button" id="join" onClick={() => { startBasicCall("join") }}>Join</button>
                        <button type="button" id="leave" onClick={() => { startBasicCall("leave") }}>Leave</button>
                        <button type="button" id="inItScreen" onClick={() => { startBasicCall("inItScreen") }}>Share Screen</button>
                        <button type="button" id="muteVideo" onClick={() => { startBasicCall("muteVideo") }}>Mute Video</button>
                        <button type="button" id="muteAudio" onClick={() => { startBasicCall("muteAudio") }}>Mute Audio</button>
                        <div id="id12"></div>
                        <div id="id13"></div>
                        {/* <br /><label> Local Audio Level :</label>
                        <button type="button" id="myButton" >Mute</button>
                        <input type="radio" min="0" id="localAudioVolume" max="100" step="1" /><br />
                        <label> Remote Audio Level :</label>
                        <input type="range" min="0" id="remoteAudioVolume" max="100" step="1"></input> */}
                    </div>
                </div>
            </div>

            <Grid></Grid>
        </div>
    );
}

export default Main;
