import firebase from "./Client";
import { collection, getDocs } from "firebase/firestore";
import swal from 'sweetalert';

export const saveForm = (values, props) =>{
    let file = values.imageUrl;
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let uploadTask = storageRef.child('folder/' + file.name + Date.now()).put(file);
    let database = firebase.firestore();
  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{

        },(error) =>{
          swal("Não foi possível processar a transação. ", error);
        },() =>{
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
          database.collection("woods").add({
            specie: values.specie === "other" ? values.other : values.specie,
            density: values.density,
            cut: values.cut,
            planer: values.planer,
            weight: values.weight,
            sandpaper: values.sandpaper,
            lathe: values.lathe,
            woodDetails: [{
              image: url,
              width: values.width,
              height: values.height,
              cutType: values.cutType
            }]
          })
          .then(() => {
            props.nextStep();
          })
          .catch((error) => {
            swal("Não foi possível processar a transação. ", error);
          });
        })
      }
    ) 
  }

export const getWoodSpecies = async () => {
  const snapshot = await firebase.firestore().collection('woodSpecies').get()
  return snapshot.docs.map(doc => doc.data());
} 
