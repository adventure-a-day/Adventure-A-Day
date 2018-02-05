/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from "./main"
export { default as UserHome } from "./user-home"
export { Login, Signup } from "./auth-form"
export { LocationTracker } from "./on-the-hunt"
export { default as PhotoInput } from "./photo-input"
export { default as Messages } from "./messages"
export { default as TeamHome } from "./team-home"
export { default as TeamSelect } from "./team-select"
export { default as PushBtn } from "./pushBtn"
export { default as SolveClue } from './solve-clue'
export {default as GalleryView} from './gallery-view'
export {default as Team} from "./team.js"
export {default as BottomNavbar} from './bottom-nav'
export {default as MapView} from './map'
