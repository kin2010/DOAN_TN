const ObjectId = require('mongodb').ObjectId;
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('products').insertMany([
      {
        stock: 999,
        detailImage: [],
        name: 'SK-II Signs Control Base - Kem lót ngọc trai',
        description:
          'Kem lót cao cấp giúp sửa chữa làn da, đẩy lùi các dấu hiệu lão hoá trước khi trang điểm, mang lại một làn da mịn, rạng rỡ và căng bóng như ánh ngọc trai.Kem lót cao cấp giúp sửa chữa làn da, đẩy lùi các dấu hiệu lão hoá trước khi trang điểm, mang lại một làn da mịn, rạng rỡ và căng bóng như ánh ngọc trai.Kem lót cao cấp giúp sửa chữa làn da, đẩy lùi các dấu hiệu lão hoá trước khi trang điểm, mang lại một làn da mịn, rạng rỡ và căng bóng như ánh ngọc trai.',
        trademark: ObjectId('62627a675a9d4631800c6c45'),
        price: 40000,
        avatar: '../images/img4.png',
        category: ObjectId('6279c88ce232736a0b5851c7'),
        subCategory: ObjectId('627bdd797bb7b533598333b0'),
      },
      {
        stock: 999,
        detailImage: [],
        name: 'MANIS White Body Shampoo Moisture - Sữa tắm dưỡng ẩm trắng da',
        description:
          'Sữa tắm giúp tẩy tế bào chết và làm trắng da toàn thân an toàn và hiệu quả. Công thức mới bổ sung nhiều độ ẩm cho da, mang lại một làn da trắng, hồng hào và mịn màng.',
        trademark: ObjectId('62627a675a9d4631800c6c45'),
        price: 480000,
        avatar: '../images/img4.png',
        category: ObjectId('6279c88ce232736a0b5851c7'),
        subCategory: ObjectId('627bdd797bb7b533598333af'),
      },
      {
        stock: 999,
        detailImage: [],
        name: 'FANCL Mild Cleansing Oil - Dầu tẩy trang',
        description:
          'Dầu tẩy trang nhiều năm liền đứng nhất bảng xếp hạng Cosme của Nhật với công nghệ NANO - chứa các phân tử siêu vi, tăng khả năng làm sạch lỗ chân lông và đánh bay mụn đầu đen.',
        trademark: ObjectId('62627a675a9d4631800c6c45'),
        price: 590000,
        avatar: '../images/img5.png',
        category: ObjectId('627499aa630c7314184823ab'),
        subCategory: ObjectId('627499aa630c7314184823ab'),
      },
    ]);
  },

  async down(db, client) {
    await db.collection('products').insertMany([
      {
        stock: 999,
        detailImage: [],
        name: 'SK-II Signs Control Base - Kem lót ngọc trai',
        description:
          'Kem lót cao cấp giúp sửa chữa làn da, đẩy lùi các dấu hiệu lão hoá trước khi trang điểm, mang lại một làn da mịn, rạng rỡ và căng bóng như ánh ngọc trai.Kem lót cao cấp giúp sửa chữa làn da, đẩy lùi các dấu hiệu lão hoá trước khi trang điểm, mang lại một làn da mịn, rạng rỡ và căng bóng như ánh ngọc trai.Kem lót cao cấp giúp sửa chữa làn da, đẩy lùi các dấu hiệu lão hoá trước khi trang điểm, mang lại một làn da mịn, rạng rỡ và căng bóng như ánh ngọc trai.',
        trademark: ObjectId('62627a675a9d4631800c6c45'),
        price: 40000,
        avatar: '../images/img4.png',
        category: ObjectId('6279c88ce232736a0b5851c7'),
        subCategory: ObjectId('627bdd797bb7b533598333b0'),
      },
      {
        stock: 999,
        detailImage: [],
        name: 'MANIS White Body Shampoo Moisture - Sữa tắm dưỡng ẩm trắng da',
        description:
          'Sữa tắm giúp tẩy tế bào chết và làm trắng da toàn thân an toàn và hiệu quả. Công thức mới bổ sung nhiều độ ẩm cho da, mang lại một làn da trắng, hồng hào và mịn màng.',
        trademark: ObjectId('62627a675a9d4631800c6c45'),
        price: 480000,
        avatar: '../images/img4.png',
        category: ObjectId('6279c88ce232736a0b5851c7'),
        subCategory: ObjectId('627bdd797bb7b533598333af'),
      },
      {
        stock: 999,
        detailImage: [],
        name: 'FANCL Mild Cleansing Oil - Dầu tẩy trang',
        description:
          'Dầu tẩy trang nhiều năm liền đứng nhất bảng xếp hạng Cosme của Nhật với công nghệ NANO - chứa các phân tử siêu vi, tăng khả năng làm sạch lỗ chân lông và đánh bay mụn đầu đen.',
        trademark: ObjectId('62627a675a9d4631800c6c45'),
        price: 590000,
        avatar: '../images/img5.png',
        category: ObjectId('627499aa630c7314184823ab'),
        subCategory: ObjectId('627499aa630c7314184823ab'),
      },
    ]);
  },
};
