// DO YOUR MAGIC
exports.up = async function (knex) {
  await knex.schema.createTable("cars", (table) => {
    table.increments("id");
    table.text("vin").unique().notNullable();
    table.text("make").notNullable();
    table.text("model").notNullable();
    table.float("mileage").notNullable();
    table.text("title");
    table.text("transmission");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("cars");
};
