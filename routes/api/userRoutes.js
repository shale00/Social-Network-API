const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/freinds/:friendId
router
  .route("/:userID/friends/:friendId")
  .get(getSingleUser)
  .put(addFriend)
  .delete(deleteFriend);

module.exports = router;
