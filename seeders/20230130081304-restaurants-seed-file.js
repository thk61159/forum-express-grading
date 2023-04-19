'use strict'
const faker = require('faker')
const { Category } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await Category.findAll({ attributes: ['id'] })
    await queryInterface.bulkInsert(
      'Restaurants',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        opening_hours: '08:00',
        image: `https://loremflickr.com/320/240/restaurant,food/?lock=${Math.floor(
					Math.random() * 100
				)}`,
        description: faker.lorem.text(),
        created_at: new Date(),
        updated_at: new Date(),
        category_id:
					categories[Math.floor(Math.random() * categories.length)].id,
        view_counts: 0
      }))
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', {})
  }
}
