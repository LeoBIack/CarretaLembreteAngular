//import { Component, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';



@Component({
  selector: 'app-lembrete-inserir',
  templateUrl: './lembrete-inserir.component.html',
  styleUrls: ['./lembrete-inserir.component.css'],
})

export class LembreteInserirComponent implements OnInit {

  private modo: string = "criar";
  private idLembrete: string;
  public lembrete: Lembrete;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("idLembrete")) {
          this.modo = "editar";
          this.idLembrete = paramMap.get("idLembrete");
          this.lembrete =
              this.lembreteService.getLembrete(this.idLembrete);
        } else {
          this.modo = "criar";
          this.idLembrete = null;
        }
      }
    );
  }

  constructor(
      public lembreteService: LembreteService,
      public route: ActivatedRoute
      ) { }

      
  //@Output() clienteAdicionado = new EventEmitter<Cliente>();
  //nome: string;
  //fone: string;
  //email: string;
  onSalvarLembrete(form: NgForm) {
    if (form.invalid) return;

    if (this.modo === "criar") {

      // Enviando os dados para o cliente service
      this.lembreteService.adicionarLembrete(
        // Capturando os dados do formulário:
        form.value.nome,
        form.value.previstaDate,
      );

    } else {

      this.lembreteService.atualizarLembrete(
        this.idLembrete,
        form.value.nome,
        form.value.previstaDate,
      );

    }


    // Limpando os campos do formulário:
    form.resetForm();

    // const cliente: Cliente = {
    //   nome: form.value.nome,
    //   fone: form.value.fone,
    //   email: form.value.email,
    // };
    // this.clienteAdicionado.emit(cliente);
  }
}

