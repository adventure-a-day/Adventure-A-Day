/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

const db = require("../server/db")
const {
  User,
  Team,
  Mission,
  Clue,
  Message,
  Photo,
  UserTeamClueStatus
} = require("../server/db/models")

async function seed() {
  await db.sync({ force: true })
  console.log("db synced!")
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const missions = await Promise.all([
    Mission.create({ name: "Daily Adventures" }),
    // Mission.create({ name: "Testing an open-ended mission" })
  ])

  const teams = await Promise.all([
    Team.create({ name: "The best team!", activeMission: true }),
    Team.create({ name: "Yeeeeeeaahhhh team", activeMission: true }),
    Team.create({ name: "You wish you were on our team", activeMission: true })
  ])

  const users = await Promise.all([
    User.create({ email: "cody@email.com", password: "123", userName: "cody" }),
    User.create({ email: "murphy@email.com", password: "123", userName: "murphy" }),
    User.create({ email: "chloe@email.com", password: "123", userName: "chloe" }),
    User.create({ email: "zoe@email.com", password: "123", userName: "zoe" }),
    User.create({ email: "miley@email.com", password: "123", userName: "miley" }),
    User.create({ email: "luna@email.com", password: "123", userName: "luna" }),
    User.create({ email: "molly@email.com", password: "123", userName: "molly" }),
    User.create({ email: "jake@email.com", password: "123", userName: "jake" }),
    User.create({ email: "harry@email.com", password: "123", userName: "harry" })
  ])

  const clues = await Promise.all([
    Clue.create({
      prompt: "Take a picture of... a cartoon doodle you drew",
      missionId: 1,
      labels: [
        "cartoon",
        "text",
        "illustration",
        "art",
        "font",
        "drawing",
        "design"
      ]
    }),
    Clue.create({
      prompt: "Take a picture of... some local artwork you found",
      missionId: 1,
      labels: [
        "street art",
        "art",
        "wall",
        "graffiti",
        "painting",
        "photo",
        "art gallery",
        "visual arts"
      ]
    }),
    Clue.create({
      prompt: "Take a picture of... your shoes today",
      missionId: 1,
      labels: [
        "shoe",
        "shoes"
      ]
    }),
    Clue.create({
      prompt: "Take a picture of... yourself in nature",
      missionId: 1,
      labels: [
        "grass",
        "plant",
        "city",
        "park",
        "garden",
        "meadow",
        "tree",
        "plant",
        "green",
        "nature",
        "leaf",
        "vegetation",
        "sunlight",
        "forest",
        "landscape",
        "flower",
        "grove",
        "flora",
        "water",
        "sky"
      ]
    }),
    Clue.create({
      prompt: "Take a picture of... an animal (the cuter the better!)",
      missionId: 1,
      labels: [
        "wildlife",
        "zoo",
        "terrestrial animal",
        "dog",
        "cat",
        "puppy",
        "kitten",
        "pet"
      ]
    }),
    Clue.create({
      prompt: "Take a picture of... your favorite eatery or one you want to try",
      missionId: 1,
      labels: [
        "restaurant",
        "cafe",
        "coffeehouse",
        "building",
        "bar"
      ]
    })

    // you and a friend
    // breakfast/coffee
  ])

  const messages = await Promise.all([
    Message.create({
      text: "Hey hey! Welcome to the party!",
      teamId: 1,
      userId: 1
    }),
    Message.create({
      text: "I'm going to win. Mwahaha!",
      teamId: 1,
      userId: 2
    }),
    Message.create({ text: "I love games", teamId: 1, userId: 1 }),
    Message.create({
      text:
        "What do you call a crowd of chess players bragging about their wins in a hotel lobby?",
      teamId: 1,
      userId: 2
    }),
    Message.create({
      text: "Chess nuts boasting in an open foyer.",
      teamId: 1,
      userId: 2
    }),
    Message.create({ text: "...", teamId: 1, userId: 1 })
  ])

  const photos = await Promise.all([
    Photo.create({ url: "https://s3.amazonaws.com/where-in-the-world-gh/dog.jpg", success: true, teamId: 1, userId: 1 }),
    Photo.create({ url: "https://s3.amazonaws.com/where-in-the-world-gh/cereal.jpg", success: false, teamId: 1, userId: 2 })
  ])

  //'unassigned', 'assigned', 'completed'
  const userTeamClueStatuses = await Promise.all([
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(1)
        return clue
      })
      .then(clue => {
        clue.setClue(1)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(1)
        return clue
      })
      .then(clue => {
        clue.setClue(2)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(1)
        return clue
      })
      .then(clue => {
        clue.setClue(3)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(1)
        return clue
      })
      .then(clue => {
        clue.setClue(4)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(1)
        return clue
      })
      .then(clue => {
        clue.setClue(5)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(1)
        return clue
      })
      .then(clue => {
        clue.setClue(6)
      }),



    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(2)
        return clue
      })
      .then(clue => {
        clue.setClue(1)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(2)
        return clue
      })
      .then(clue => {
        clue.setClue(2)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(2)
        return clue
      })
      .then(clue => {
        clue.setClue(3)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(2)
        return clue
      })
      .then(clue => {
        clue.setClue(4)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(2)
        return clue
      })
      .then(clue => {
        clue.setClue(5)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(2)
        return clue
      })
      .then(clue => {
        clue.setClue(6)
      }),






      UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(3)
        return clue
      })
      .then(clue => {
        clue.setClue(1)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(3)
        return clue
      })
      .then(clue => {
        clue.setClue(2)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(3)
        return clue
      })
      .then(clue => {
        clue.setClue(3)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(3)
        return clue
      })
      .then(clue => {
        clue.setClue(4)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(3)
        return clue
      })
      .then(clue => {
        clue.setClue(5)
      }),
    UserTeamClueStatus.create({ status: "unassigned" })
      .then(clue => {
        clue.setTeam(3)
        return clue
      })
      .then(clue => {
        clue.setClue(6)
      })


  ])

  const teamMembers = await Promise.all([
    Team.findById(1).then(foundTeam => {
      return foundTeam.setUsers([1, 2, 3])
    }),
    Team.findById(2).then(foundTeam => {
      return foundTeam.setUsers([1, 4, 5, 6])
    }),
    Team.findById(3).then(foundTeam => {
      return foundTeam.setUsers([7, 8, 9])
    })
  ])

  const teamMissions = await Promise.all([
    Mission.findById(1).then(found => {
      return found.setTeams([1, 2, 3])
    })
    // Mission.findById(2).then(found => {
    //   return found.setTeams([3])
    // })
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(
    `seeded ${users.length} users, ${teams.length} teams, ${
      missions.length
    } missions, ${clues.length} clues, ${photos.length} photos`
  )
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log("closing db connection")
    db.close()
    console.log("db connection closed")
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log("seeding...")
