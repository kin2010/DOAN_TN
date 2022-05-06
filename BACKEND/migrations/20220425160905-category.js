const ObjectId = require('mongodb').ObjectId;
module.exports = {
  async up(db, client) {
    // await db.collection('categorys').insertMany([
    //   {
    //     name: 'Chăm sóc da',
    //     description: 'category ok',
    //   },
    //   {
    //     name: 'Chăm sóc tóc',
    //     description: 'category ok',
    //   },
    //   {
    //     name: 'Trang điểm',
    //     description: 'category ok',
    //   },
    //   {
    //     name: 'Dưỡng thể',
    //     description: 'category ok',
    //   },
    // ]);
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db.collection('subcategories').insertMany([
      {
        name: 'Chăm sóc da',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
      {
        name: 'Tẩy trang',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
      {
        name: 'Sửa rửa mặt',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
      {
        name: 'Tẩy tế bào chết',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
      {
        name: 'Kem chống nắng',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
      {
        name: 'Dưỡng mát',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
      {
        name: 'Dưỡng ẩm',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
      {
        name: 'Dưỡng trắng',
        categoryId: ObjectId('627499aa630c7314184823ab'),
        description: 'category ok',
      },
    ]);
  },

  async down(db, client) {
    await db.collection('categorys').insertMany([
      {
        name: 'Chăm sóc da',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
      {
        name: 'Tẩy trang',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
      {
        name: 'Sửa rửa mặt',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
      {
        name: 'Tẩy tế bào chết',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
      {
        name: 'Kem chống nắng',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
      {
        name: 'Dưỡng mát',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
      {
        name: 'Dưỡng ẩm',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
      {
        name: 'Dưỡng trắng',
        categoryId: ObjectId('6266ca55d04373e272735557'),
        description: 'category ok',
      },
    ]);
  },
};
///{ $ref: 'categorys', $id: '6266ca55d04373e272735557' }
// { $ref: 'categorys', $id: '6266ca55d04373e272735557' }
// { $ref: 'categorys', $id: '6266ca55d04373e272735557' }
// { $ref: 'categorys', $id: '6266ca55d04373e272735557' }
// { $ref: 'categorys', $id: '6266ca55d04373e272735557' }
// { $ref: 'categorys', $id: '6266ca55d04373e272735557' }
// { $ref: 'categorys', $id: '6266ca55d04373e272735557' }
// { $ref: 'categorys', $id: '6266ca55d04373e272735557' }
