import React, {useEffect, useState} from 'react';

import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

function getAlumnos() {
    const querydb = getFirestore();
    const queryDoc = doc(querydb, 'alumnos', '4kdUqZKobEDBh1Eh2d1x');
    getDoc(queryDoc)
    .then(res => console.log(res))
}