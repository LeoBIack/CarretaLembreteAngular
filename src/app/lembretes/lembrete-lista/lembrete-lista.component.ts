import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lembrete-lista',
  templateUrl: './lembrete-lista.component.html',
  styleUrls: ['./lembrete-lista.component.css'],
})
export class LembreteListaComponent
  implements OnInit, OnDestroy {


    lembretes: Lembrete[] = [];
  private lembretesSubscription: Subscription;

  constructor(public lembreteService: LembreteService) {}

  /**
   * Método executado quando o componente
   * é criado na memória, antes mesmo de ser
   * desenhado na tela do usuário.
   */
  ngOnInit(): void {
    this.lembreteService.getLembretes();
    this.lembretesSubscription = this.lembreteService
    .getListaLembretesAtualizadaObservable()
    .subscribe((lembretes: Lembrete[]) => {
      this.lembretes = lembretes;
    });
  }

  /**
   * Método executado pelo Angular, quando
   * este componente, ou instância desse componente,
   * for removido e destruído
   */
  ngOnDestroy(): void {
    // Estamos removendo nossa inscrição para receber
    // alertas das novidades do objeto observado:
    this.lembretesSubscription.unsubscribe();
  }

  onDelete (id: string): void{
    this.lembreteService.removerLembrete(id);
  }

}
