import bcrypt from 'bcryptjs';

const data = {

    users: [
        {
            name:'Illia',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('admin'),
            isAdmin: true,
        },
        {
            name:'Pavlo',
            email: 'pavlo@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],

    products:[
        {
            //_id: '1',
            name: 'Гаррі Поттер і Філософський Камінь',
            slug: 'book1',
            category: 'Фантастика',
            image: '/images/d1.jpg',
            price: '199',
            countInStock: '12',
            author: 'Дж.К. Роулінг',
            rating: '4.8',
            numReviews: '25'
        },
        {
            //_id: '2',
            name: 'Гаррі Поттер і таємна кімната',
            slug: 'book2',
            category: 'Фантастика',
            image: '/images/d2.jpg',
            price: '209',
            countInStock: '18',
            author: 'Дж.К. Роулінг',
            rating: '4.4',
            numReviews: '17'
        },
        {
            //_id: '3',
            name: 'Гаррі Поттер і вʼязень Аскабану',
            slug: 'book3',
            category: 'Фантастика',
            image: '/images/d3.jpg',
            price: '189',
            countInStock: '23',
            author: 'Дж.К. Роулінг',
            rating: '4.6',
            numReviews: '13'
        },
        {
            //_id: '4',
            name: 'Ніч із девʼятнадцяти днів',
            slug: 'book4',
            category: 'Пригоди',
            image: '/images/d4.jpg',
            price: '189',
            countInStock: '34',
            author: 'Марту Гулей',
            rating: '4.9',
            numReviews: '7'
        },
        {
            //_id: '5',
            name: 'Теодори з Васюківки',
            slug: 'book5',
            category: 'Пригоди',
            image: '/images/d5.jpg',
            price: '259',
            countInStock: '5',
            author: 'Всеволод Нестайко',
            rating: '3.7',
            numReviews: '26'
        },
        {
            //_id: '6',
            name: 'Пригоди Тома Сойєра',
            slug: 'book6',
            category: 'Пригоди',
            image: '/images/d6.jpg',
            price: '299',
            countInStock: '0',
            author: 'Марк Твен',
            rating: '4.9',
            numReviews: '24'
        },
    ]
}
export default data;