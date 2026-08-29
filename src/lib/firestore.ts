import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getDb() {
  if (getApps().length === 0) {
    const raw = process.env.FIRESTORE_SERVICE_ACCOUNT;
    if (!raw) throw new Error("FIRESTORE_SERVICE_ACCOUNT is not set");
    const serviceAccount = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

const COLLECTION = "applications";

export async function markApplicationStatus(caseNumber: string, applied: boolean) {
  const db = getDb();
  await db.collection(COLLECTION).doc(caseNumber).set(
    { applied, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function getApplicationStatuses(): Promise<Record<string, boolean>> {
  const db = getDb();
  const snapshot = await db.collection(COLLECTION).get();
  const statuses: Record<string, boolean> = {};
  snapshot.forEach((doc) => {
    statuses[doc.id] = !!doc.data().applied;
  });
  return statuses;
}
