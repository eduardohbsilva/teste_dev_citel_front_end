import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { AppComponentService } from './services/app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(protected appComponentService: AppComponentService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public loading = false;
  info: string = 'Escolha um arquivo';

  title = 'front-end';

  fileToUpload: File = null;

  nomesEstados: string[] = [];
  quantidadeEstados: number[] = [];

  idadesFaixa: string[] = [];
  mediasFaixa: number[] = [];

  tiposSanguineos: string[] = [];
  mediasTiposSanguineos: number[] = [];

  tiposSanguineosDoadores: string[] = [];
  quantidadeDoadores: number[] = [];

  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };

  public pieChartOptions2: ChartOptions = {
    responsive: true,
  };

  public pieChartOptions4: ChartOptions = {
    responsive: true,
  };

  public pieChartOptions5: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels1: Label[] = this.nomesEstados;
  public pieChartData1: SingleDataSet = this.quantidadeEstados;
  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];

  public pieChartLabels2: Label[] = this.idadesFaixa;
  public pieChartData2: SingleDataSet = this.mediasFaixa;
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];

  public pieChartLabels4: Label[] = this.tiposSanguineos;
  public pieChartData4: SingleDataSet = this.mediasTiposSanguineos;
  public pieChartType4: ChartType = 'pie';
  public pieChartLegend4 = true;
  public pieChartPlugins4 = [];

  public pieChartLabels5: Label[] = this.tiposSanguineosDoadores;
  public pieChartData5: SingleDataSet = this.quantidadeDoadores;
  public pieChartType5: ChartType = 'pie';
  public pieChartLegend5 = true;
  public pieChartPlugins5 = [];

  ngOnInit() {
    this.loadPage();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.info = 'Aguarde';
      this.appComponentService.create({"pessoas": JSON.parse(fileReader.result.toString())}).subscribe(() => {window.location.reload(); this.info = 'Escolha um arquivo';});
    }
    fileReader.readAsText(this.fileToUpload);
  }

  loadPage() {
    this.appComponentService
      .getCandidatesByState()
      .subscribe(
        (res: HttpResponse<any[]>) => { 
          res.body.forEach(element => {
            this.nomesEstados.push(element.estado);
            this.quantidadeEstados.push(element.quantidade);
          });
        }
      );

    this.appComponentService
      .getAverageByAge()
      .subscribe(
        (res: HttpResponse<any[]>) => {
          res.body.forEach(element => {
            this.idadesFaixa.push(element.idade);
            this.mediasFaixa.push(element.media);
          });
        }
      );

    this.appComponentService
      .getAverageByBloodType()
      .subscribe(
        (res: HttpResponse<any[]>) => {
          res.body.forEach(element => {
            this.tiposSanguineos.push(element.sangue);
            this.mediasTiposSanguineos.push(element.media);
          });
        }
      );

    this.appComponentService
      .getDonorsByBloodType()
      .subscribe(
        (res: HttpResponse<any[]>) => {
          res.body.forEach(element => {
            this.tiposSanguineosDoadores.push(element.sangue);
            this.quantidadeDoadores.push(element.quantidade);
          });
        }
      );
  }
}
