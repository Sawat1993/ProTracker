import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncHttpService } from "../provider/async-http.service";
import { NotificationService } from "../provider/notification";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() title: any = 'Create Project';
  @Input() projectID: any;
  projectDetail: any = {
    name: '',
    managerID: '',
    startDate: '',
    endDate: '',
    projectType: '',
    description: '',
    status: '',
    type: ''
  };

  constructor(private service: AsyncHttpService, private activatedRoute: ActivatedRoute, private notification: NotificationService) { }


  ngOnInit() {
    if (this.projectID) {
      this.service.get('http://192.168.216.48:8080/protracker/app/api/projects/' + this.projectID).subscribe(data => {
        this.projectDetail = data;
        console.log(data);
      })
    }
  }

  save() {
    this.service.post('http://192.168.216.48:8080/protracker/app/api/projects/create',
      {
        id: this.projectID,
        projectTitle: this.projectDetail.name,
        projectName: this.projectDetail.name,
        description: this.projectDetail.description,
        startDate: this.projectDetail.startDate,
        endDate: this.projectDetail.endDate,
        status: this.projectDetail.status,
        managerName: this.projectDetail.managerID,
        managerEmail: this.projectDetail.managerID
      }).subscribe(data => {
        this.notification.updateNotification({
          show: true,
          status: data.responseCode ,
          message: data.responseCode == 200 ? 'Success' : 'Faliure'
        })
      })
  }

}

