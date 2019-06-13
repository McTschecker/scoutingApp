export const minimal = [
  'Starting Level',
  'Was Present',
  'Auto Line',
  'Climb Level',
  'Broken or Fall',
  'Cargoship Cargo',
  'Cargoship HP',
  'Rocket Cargo',
  'Rocket HP',
  'Rocket1 Cargo',
  'Rocket1 HP',
  'Rocket2 Cargo',
  'Rocket2 HP',
  'Rocket3 Cargo',
  'Rocket3 HP',
  'Dropped Cargo',
  'Dropped HP',
  'Got played Defense on',
  'Played Defense',
  'Comments',
  'Name'
]
var byMatches = minimal
byMatches.unshift('Matches')

export const rowHeadersMinimal = ['startingLevel', 'wasPresent', 'crossedAuto', 'climbLevel', 'brokenOrFall',
  'cargoShipCargo', 'cargoShipHP',
  'rocketCargo', 'rocketHP',
  'rocket1LvlCargo', 'rocket1LvlHP',
  'rocket2LvlCargo', 'rocket2LvlHP',
  'rocket3LvlCargo', 'rocket3LvlHP',
  'droppedHP', 'droppedCargo',
  'defended', 'defenseBot',
  'comment', 'userName'
]

var keysByMatches = rowHeadersMinimal
keysByMatches.unshift('matchNumber')
export const averageHeaders = ['matches', 'Cargo', 'Hatches', 'cargoship', 'rocket', 'climb']

export { byMatches, keysByMatches } // For Team Screen
