/* src/App.js */
import './App.css';
import {useState} from 'react';
import {handleUpload} from "./pinFilePinata";


/*

const pinataSDK= require('@pinata/sdk');
const pinata = pinataSDK(
    'a021b51c3eee8d65e427','b7422d9d3a4d275bbb43ea05599f706883e5163277124bb6e9c9b86b0dd0a4e2'
)

//const TOKEN= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjYwZmRmYi1lZmRjLTRmZTktOGYwYi1jZjg4OTExOGFmMjkiLCJlbWFpbCI6InB1bmVldEBwZXJzaXN0ZW5jZS5vbmUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTAyMWI1MWMzZWVlOGQ2NWU0MjciLCJzY29wZWRLZXlTZWNyZXQiOiJiNzQyMmQ5ZDNhNGQyNzViYmI0M2VhMDU1OTlmNzA2ODgzZTUxNjMyNzcxMjRiYjZlOWM5Yjg2YjBkZDBhNGUyIiwiaWF0IjoxNjM0NjQ5MTg4fQ.i514LU4xYYu95OvuZJ6vhWKgUqmXxnkhMMmDw-GmpCg'



pinata.testAuthentication().then((result ) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
 */

function App() {
    let [fileUrl, updateFileUrl] = useState(``)

    /*
     let IpfsHash=''
     async function pinataFile(metaObj){

         let result= await pinata.pinJSONToIPFS(metaObj)
         console.log(result);
         IpfsHash=result.IpfsHash;
         return result
     }
     */
    async function onChange(e) {
        /*
        let client = await IPFS.create()
        let data = new FormData()
        data.append(`name`,file.name)
        console.log(e.target.value)

         */
        const file = e.target.files[0]
        console.log(file)
        const fileName = 'nft'

        try {
            let res = await handleUpload(file, fileName, true)
            console.log(res)
            console.log(res.IpfsHash)
            updateFileUrl="https://demo-assetmantle.mypinata.cloud/ipfs/"+res.IpfsHash+"/"+file.name
            console.log(updateFileUrl)
            /* let CID= await client.add( {path:'images/',content: file },
                 { wrapWithDirectory: true })
             console.log(CID)
             const url = `https://gateway.pinata.cloud/ipfs/${CID.path}`

             updateFileUrl(url)
             const options={
                     "name":"SampleImage",
                     "Description":"plain-text",
                     "image":"ipfs://"+added.path,
             }
             pinataFile(options).then(r => console.log(r.IpfsHash));
             console.log("JSON Hash: ",IpfsHash);
             const pinataURL='https://demo-assetmantle.mypinata.cloud/ipfs/'
              */
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    return (
        <div className="App">
            <script type="module" src={"https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"}/>
            <h1>IPFS Example</h1>
            <input
                type="file"
                onChange={onChange}
            />
            {
                fileUrl && (
                    <model-viewer src={updateFileUrl} camera-controls auto-rotate></model-viewer>
                )
            }
        </div>



    );
}

export default App