import react from 'react';
import { useState } from 'react';

const DownloadCSV = () => {
    const [downloadAllowed, setDownloadAllowed] = useState(false);
    const download = () => {
        console.log("DOWNLOADING");
        setDownloadAllowed(true);
        fetch("http://localhost:3000/api/answers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            var answers = data.data;
            console.log(answers);
            var csv = "Question,Answer, Classroom\n";
            for (var i = 0; i < answers.length; i++) {
                console.log(answers[i]);
                csv += answers[i].question + "," + answers[i].answer +  "," + answers[i].classroomId + "\n";

            
            }
            download_csv_file(csv);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }


    function download_csv_file(csv) {
        if (downloadAllowed) {
            var hiddenElement = document.createElement("a");
            hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
            hiddenElement.target = "_blank";
            hiddenElement.download = "answers.csv";
            hiddenElement.click();
            setDownloadAllowed(false);
        } 



    }
    return (
        <button onClick={download}>Download</button>
    );

}

export default DownloadCSV;