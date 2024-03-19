const Sequelize = require("sequelize");

require("dotenv").config();

const { CONNECTION_STRING } = process.env;
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
});

module.exports = {
  // Function to seed the database with initial data
  seed: (req, res) => {
    sequelize.query(`
        drop table if exists cities;
        drop table if exists countries;

        create table countries (
            country_id serial primary key, 
            name varchar
        );

        CREATE TABLE cities (
          city_id SERIAL PRIMARY KEY, 
          name VARCHAR(25), 
          rating INTEGER, 
          country_id INTEGER REFERENCES countries(country_id)
      ); 

        insert into countries (name)
        values ('Afghanistan'),
        ('Albania'),
        ('Algeria'),
        ('Andorra'),
        ('Angola'),
        ('Antigua and Barbuda'),
        ('Argentina'),
        ('Armenia'),
        ('Australia'),
        ('Austria'),
        ('Azerbaijan'),
        ('Bahamas'),
        ('Bahrain'),
        ('Bangladesh'),
        ('Barbados'),
        ('Belarus'),
        ('Belgium'),
        ('Belize'),
        ('Benin'),
        ('Bhutan'),
        ('Bolivia'),
        ('Bosnia and Herzegovina'),
        ('Botswana'),
        ('Brazil'),
        ('Brunei'),
        ('Bulgaria'),
        ('Burkina Faso'),
        ('Burundi'),
        ('Côte d''Ivoire'),
        ('Cabo Verde'),
        ('Cambodia'),
        ('Cameroon'),
        ('Canada'),
        ('Central African Republic'),
        ('Chad'),
        ('Chile'),
        ('China'),
        ('Colombia'),
        ('Comoros'),
        ('Congo'),
        ('Costa Rica'),
        ('Croatia'),
        ('Cuba'),
        ('Cyprus'),
        ('Czech Republic'),
        ('Democratic Republic of the Congo'),
        ('Denmark'),
        ('Djibouti'),
        ('Dominica'),
        ('Dominican Republic'),
        ('Ecuador'),
        ('Egypt'),
        ('El Salvador'),
        ('Equatorial Guinea'),
        ('Eritrea'),
        ('Estonia'),
        ('Eswatini'),
        ('Ethiopia'),
        ('Fiji'),
        ('Finland'),
        ('France'),
        ('Gabon'),
        ('Gambia'),
        ('Georgia'),
        ('Germany'),
        ('Ghana'),
        ('Greece'),
        ('Grenada'),
        ('Guatemala'),
        ('Guinea'),
        ('Guinea-Bissau'),
        ('Guyana'),
        ('Haiti'),
        ('Holy See'),
        ('Honduras'),
        ('Hungary'),
        ('Iceland'),
        ('India'),
        ('Indonesia'),
        ('Iran'),
        ('Iraq'),
        ('Ireland'),
        ('Israel'),
        ('Italy'),
        ('Jamaica'),
        ('Japan'),
        ('Jordan'),
        ('Kazakhstan'),
        ('Kenya'),
        ('Kiribati'),
        ('Kuwait'),
        ('Kyrgyzstan'),
        ('Laos'),
        ('Latvia'),
        ('Lebanon'),
        ('Lesotho'),
        ('Liberia'),
        ('Libya'),
        ('Liechtenstein'),
        ('Lithuania'),
        ('Luxembourg'),
        ('Madagascar'),
        ('Malawi'),
        ('Malaysia'),
        ('Maldives'),
        ('Mali'),
        ('Malta'),
        ('Marshall Islands'),
        ('Mauritania'),
        ('Mauritius'),
        ('Mexico'),
        ('Micronesia'),
        ('Moldova'),
        ('Monaco'),
        ('Mongolia'),
        ('Montenegro'),
        ('Morocco'),
        ('Mozambique'),
        ('Myanmar'),
        ('Namibia'),
        ('Nauru'),
        ('Nepal'),
        ('Netherlands'),
        ('New Zealand'),
        ('Nicaragua'),
        ('Niger'),
        ('Nigeria'),
        ('North Korea'),
        ('North Macedonia'),
        ('Norway'),
        ('Oman'),
        ('Pakistan'),
        ('Palau'),
        ('Palestine State'),
        ('Panama'),
        ('Papua New Guinea'),
        ('Paraguay'),
        ('Peru'),
        ('Philippines'),
        ('Poland'),
        ('Portugal'),
        ('Qatar'),
        ('Romania'),
        ('Russia'),
        ('Rwanda'),
        ('Saint Kitts and Nevis'),
        ('Saint Lucia'),
        ('Saint Vincent and the Grenadines'),
        ('Samoa'),
        ('San Marino'),
        ('Sao Tome and Principe'),
        ('Saudi Arabia'),
        ('Senegal'),
        ('Serbia'),
        ('Seychelles'),
        ('Sierra Leone'),
        ('Singapore'),
        ('Slovakia'),
        ('Slovenia'),
        ('Solomon Islands'),
        ('Somalia'),
        ('South Africa'),
        ('South Korea'),
        ('South Sudan'),
        ('Spain'),
        ('Sri Lanka'),
        ('Sudan'),
        ('Suriname'),
        ('Sweden'),
        ('Switzerland'),
        ('Syria'),
        ('Tajikistan'),
        ('Tanzania'),
        ('Thailand'),
        ('Timor-Leste'),
        ('Togo'),
        ('Tonga'),
        ('Trinidad and Tobago'),
        ('Tunisia'),
        ('Turkey'),
        ('Turkmenistan'),
        ('Tuvalu'),
        ('Uganda'),
        ('Ukraine'),
        ('United Arab Emirates'),
        ('United Kingdom'),
        ('United States of America'),
        ('Uruguay'),
        ('Uzbekistan'),
        ('Vanuatu'),
        ('Venezuela'),
        ('Vietnam'),
        ('Yemen'),
        ('Zambia'),
        ('Zimbabwe');

        INSERT INTO cities (name, rating, country_id) VALUES
      ('New York', 5, 187),
      ('Los Angeles', 4, 187),
      ('Chicago', 4, 187),
      ('Houston', 3, 187),
      ('Phoenix', 4, 187),
      ('Philadelphia', 5, 187),
      ('San Antonio', 4, 187),
      ('San Diego', 5, 187),
      ('Dallas', 3, 187),
      ('San Jose', 4, 187),
      ('Austin', 5, 187),
      ('Jacksonville', 4, 187),
      ('Fort Worth', 3, 187),
      ('Columbus', 4, 187),
      ('Charlotte', 5, 187),
      ('San Francisco', 5, 187),
      ('Indianapolis', 4, 187),
      ('Seattle', 5, 187),
      ('Denver', 4, 187),
      ('Washington', 5, 187);
    `).then(() => {
        console.log('DB seeded!')
        res.sendStatus(200)
    }).catch(err => console.log('error seeding DB', err))
},

  // Function to get all countries from the database
  getCountries: (req, res) => {
    sequelize
      .query("SELECT * FROM countries")
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  },

  // Function to create a new city in the database
  createCity: (req, res) => {
    let { name, rating, country_id } = req.body;

    sequelize
      .query(`SELECT name FROM countries WHERE country_id = ${country_id}`)
      .then((dbRes) => {
        if (!dbRes[0][0]) {
          res.status(400).send({ error: "Country not found" });
          return;
        }
        let country_name = dbRes[0][0].name;
        return sequelize.query(
          `INSERT INTO cities (name, rating, country_id) 
                     VALUES ('${name}', ${rating}, ${country_id})`
        );
      })
      .then((dbRes) => {
        if (dbRes) {
          res.status(200).send(dbRes[0]);
          console.log(dbRes);
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ error: "An error occurred while creating the city" });
      });
  },
 
  // Function to get all cities with their corresponding countries from the database
  getCities: (req, res) => {
    sequelize
      .query(
        `SELECT cities.city_id, cities.name as city, cities.rating, countries.name as country
               FROM cities
               JOIN countries
               ON cities.country_id = countries.country_id
               ORDER BY cities.rating DESC`
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  },

  // Function to delete a city from the database
  deleteCity: (req, res) => {
    let { id } = req.params;
    sequelize
      .query(`DELETE FROM cities WHERE city_id = ${id}`)
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  },
};
