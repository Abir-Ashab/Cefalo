exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users2').del()
    .then(() => {
      // Inserts seed entries
      return knex('users2').insert([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
      ]);
    });
};
