var app = new Vue({
    el: '#app',
    data: {
        myMessages: {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: '',
            status: 'sent'
        },
        userMessages: {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: 'ok',
            status: 'received'
        },
        search: '',
        contacts: [
            {
                name: 'Michele',
                avatar: 'img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: 'img/avatar_2.jpg',
                visible: false,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: 'img/avatar_3.jpg',
                visible: false,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: 'img/avatar_4.jpg',
                visible: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ]
    },
    computed: {
        filteredContacts() {
            return this.contacts.filter(user => {
                return user.name.toLowerCase().trim().includes(this.search.toLowerCase().trim())
            })
        }
    },
    methods: {
        changeVisible(index) {
            this.contacts.forEach(contact => {
                contact.visible = false;
            });
            if (this.contacts[index].visible === false) {
                this.contacts[index].visible = true;
            }
        },
        sendMessage(i) {
            if (this.myMessages.text.length > 1) {
                this.contacts[i].messages.push(this.myMessages);
                this.userResponses(i); // Funzione per controllare il messaggio inviato e impostare la risposta dell'utente in base a ciò che scriviamo
                setTimeout(() => {
                    this.contacts[i].messages.push(this.userMessages);
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'ok',
                        status: 'received'
                    }
                }, 1000);
                setTimeout(() => {
                    this.scrollToEnd();
                }, 1001);
            }
            this.myMessages = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: '',
                status: 'sent'
            }
        },
        deleteMessage(index, index_second) {
            this.contacts[index].messages.splice(index_second, 1);
        },
        scrollToEnd() {
            var containerChat = this.$el.querySelector('#chat-main');
            containerChat.scrollTop = containerChat.scrollHeight;
        },
        userResponses(index) {
            switch (this.myMessages.text) {
                case 'Buongiorno':
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'Buongiorno Mario 😄', // &#128516;
                        status: 'received'
                    }
                break;
                case 'Buonanotte':
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'Buonanotte Mario 😴', // &#128564;
                        status: 'received'
                    }
                break;
                case 'Come ti chiami?':
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: this.contacts[index].name,
                        status: 'received'
                    }
                break;
                case 'Che giorno è oggi?':
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: dayjs().format('DD//MM/YYYY'),
                        status: 'received'
                    }
                break;
                case 'Mi mandi il link di youtube?':
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'https://www.youtube.com/',
                        status: 'received'
                    }
                break;
                case 'Grazie' + ' ' + this.contacts[index].name:
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'Figurati 😉', // &#128521;
                        status: 'received'
                    }
                break;
            }
        }
    }
});