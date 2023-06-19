const mockingoose = require("mockingoose");
const User = require('../model/User')
const {
    getUsersByIds,
    existsByEmail,
    findByEmail,
    getUserById,
    deleteUser,
    createUser, updateUserData
} = require("../service/userService");
const bcrypt = require('bcryptjs');
const hash = jest.fn();
bcrypt.hash = hash;

describe('User management tests', () => {
        beforeAll(() => {
            mockingoose(User).toReturn([{
                _id: '6481fc964702387d5762f4c9',
                name: "name",
                surname: 'surname',
                middleName: "middleName",
                birthDate: '2002-05-03T00:00:00.000+00:00',
                sex: "female",
                phoneNumber: "+380680000000",
                email: "email@gmail.com",
                roles: ['creator']
            }, {
                _id: '6481fc964702387d5762f4c6',
                name: "name2",
                surname: 'surname2',
                middleName: "middleName2",
                birthDate: '2002-02-03T00:00:00.000+00:00',
                sex: "male",
                phoneNumber: "+380681111111",
                email: "email2@gmail.com"
            }], 'find')
                .toReturn(
                    {
                        _id: '6481fc964702387d5762f4c9',
                        name: "name",
                        surname: 'surname',
                        middleName: "middleName",
                        birthDate: '2002-05-03T00:00:00.000+00:00',
                        sex: "female",
                        phoneNumber: "+380680000000",
                        email: "email@gmail.com",
                        roles: ['creator']
                    }, "findOne"
                )
                .toReturn(
                    {
                        _id: '6481fc964702387d5762f4c9',
                        name: "name",
                        surname: 'surname',
                        middleName: "middleName",
                        birthDate: '2002-05-03T00:00:00.000+00:00',
                        sex: "female",
                        phoneNumber: "+380680000000",
                        email: "email@gmail.com",
                        roles: ['creator']
                    }, "deleteOne"
                ).toReturn(
                {
                    _id: "6481fc964702387d5762f4c6",
                    name: "name3",
                    surname: 'surname3',
                    middleName: "middleName",
                    birthDate: '2002-05-03T00:00:00.000+00:00',
                    sex: "female",
                    phoneNumber: "+380681234568",
                    email: "email3@gmail.com",
                    role: ['assignee'],
                    password: ""
                }, "save"
            )
        })

        it('find Users By Ids', async () => {
            const ids = '6481fc964702387d5762f4c9, 6481fc964702387d5762f4c6';
            const result = await getUsersByIds(ids, 'creator');
            console.log(result)
            expect(result[0].name).toBe('name')
        })

        it('find User By email', async () => {
            const email = "email@gmail.com";
            const result = await findByEmail(email);
            console.log(result)
            expect(result[0].name).toBe('name')
        })

        it('find User By id', async () => {
            const id = "6481fc964702387d5762f4c9";
            const result = await getUserById(id);
            console.log(result)
            expect(result.name).toBe('name')
        })

        it('delete User By id', async () => {
            const id = "6481fc964702387d5762f4c9";
            const result = await deleteUser(id);
            console.log(result)
            expect(result.name).toBe('name')
        })

        it('create User', async () => {

            const newUser = {
                name: "name3",
                surname: 'surname3',
                middleName: "middleName",
                birthDate: '2002-05-03T00:00:00.000+00:00',
                sex: "female",
                phoneNumber: "+380681234568",
                email: "email3@gmail.com",
                role: ['assignee'],
                password: "12345678"
            };
            const result = await createUser(newUser);
            console.log(result)
            expect(result.name).toBe('name3')
        })

    it('update User', async () => {

        const newUser = {
            name: "name3",
            surname: 'surname3',
            middleName: "middleName",
            birthDate: '2002-05-03T00:00:00.000+00:00',
            sex: "female",
            phoneNumber: "+380681234568",
            email: "email4@gmail.com",
            role: ['assignee'],
            password: "12345678"
        };
        const result = await updateUserData('6481fc964702387d5762f4c6',newUser);
        console.log(result)
        expect(result.name).toBe('name3')
    })
    }
)