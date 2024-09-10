import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class MentorService {

    url = 'https://api.github.com/users';
    newMentors: any;
    getMentors() {
        const subject = new Subject();
        fetch(this.url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        subject.next(data);
                        subject.complete();
                        console.log('John', data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);

            });

        return subject;
    }

    getMentor(username: string) {
        const subject = new Subject();
        console.log('heer: ' + username + ' love');

        fetch(`${this.url}/${username}`)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        subject.next(data);
                        subject.complete();
                        // console.log('Johnny boy',data);
                        // return data
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

        return subject;
        // return Mentors.find(mentor => mentor.id == id)
    }
}

