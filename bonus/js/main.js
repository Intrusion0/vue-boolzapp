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
        searchMessages: '',
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
        },
        filteredMessages() {
            for (let i = 0; i < this.contacts.length; i++) {
                return this.contacts[i].messages.filter(message => {
                    return message.text.toLowerCase().trim().includes(this.searchMessages.toLowerCase().trim());
                })
            }
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

                // salviamo l'ultimo messaggio in una var
                let text = document.querySelectorAll('.text-truncate')[i];
                text.innerText = 'Sta scrivendo';
                text.classList.add('writing');

                setTimeout(() => {
                    this.contacts[i].messages.push(this.userMessages);
                    this.userMessages = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'ok',
                        status: 'received'
                    }

                    let lastMessage = this.contacts[i].messages.at(-1).text;

                    text.innerText = lastMessage;
                    text.classList.remove('writing');

                }, Math.floor(Math.random() * 1500) + 1000);

                setTimeout(() => {
                    this.scrollToEnd();
                }, 2500);
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
            switch (this.myMessages.text.toLowerCase().trim()) {
                case 'buongiorno':
                    this.userMessages.text = 'Buongiorno Mario 😄'; // &#128516;
                break;
                case 'buonanotte':
                    this.userMessages.text = 'Buonanotte Mario 😴'; // &#128564;
                break;
                case 'come ti chiami?':
                    this.userMessages.text = this.contacts[index].name;
                break;
                case 'che giorno è oggi?':
                    this.userMessages.text = dayjs().format('DD//MM/YYYY');
                break;
                case 'mi mandi il link di youtube?':
                    this.userMessages.text = 'https://www.youtube.com';
                break;
                case 'grazie':
                    this.userMessages.text = 'Figuati 😉';
                break;
            }
        },
        openSearchMess() { // Apertura container per ricercare i messaggi
            let contSearchMess = document.querySelector('.container-search-messages');
            contSearchMess.classList.add('active');
        },
        closeSearchMess() { // Chiusura container per ricercare i messaggi
            let contSearchMess = document.querySelector('.container-search-messages');
            contSearchMess.classList.remove('active');
        }
    }
});