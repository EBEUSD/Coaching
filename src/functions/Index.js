const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteAuthUser = functions.https.onCall(async (data, context) => {
  // Solo ‘owner’ debería poder llamar; podés verificar un claim custom o leer su perfil
  const uidToDelete = data.uid;
  if (!uidToDelete) throw new functions.https.HttpsError("invalid-argument", "uid requerido");

  try {
    await admin.auth().deleteUser(uidToDelete);
    return { ok: true };
  } catch (e) {
    throw new functions.https.HttpsError("internal", e.message);
  }
});
