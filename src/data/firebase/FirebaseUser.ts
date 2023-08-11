import { Firestore, QueryDocumentSnapshot } from "firebase/firestore";
import { Pub } from "../../domain/Pub.model";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Game, GamePlayerThumb } from "../../domain/Game.model";
import { User } from "../../domain/User.model";

export class FirebaseUser {
  static getWholeUserData = async (): Promise<User[]> => {
    const firestore = firebase.firestore();
    const pubCol = firestore.collection("wwp_users");
    const pubDocsData = await pubCol.get();

    let tempList: User[] = [];

    for (var oneDoc of pubDocsData.docs) {
      tempList.push(User.fromData(oneDoc.data()));
    }

    return tempList;
  };

  static addNewUser = async (
    newUserId: string,
    inputData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const newUserDoc = firestore.collection("wwp_users").doc(newUserId);
      const newUserDocData = await newUserDoc.get();
      if (!newUserDocData.exists) {
        await newUserDoc.set(inputData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebaseUser] addNewUser e: ${error}`);
      return false;
    }
  };

  static updateUser = async (
    UserId: string,
    updateData: any
  ): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const updateUserDoc = firestore.collection("wwp_users").doc(UserId);
      const updateUserDocData = await updateUserDoc.get();
      if (updateUserDocData.exists) {
        await updateUserDoc.update(updateData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`[FirebaseUser] updateUser e: ${error}`);
      return false;
    }
  };
}
