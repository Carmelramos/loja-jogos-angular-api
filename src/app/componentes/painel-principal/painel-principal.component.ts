/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../servicos/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-principal',
  standalone: true,
  imports: [CommonModule], // Aqui estamos incluindo o CommonModule diretamente no componente
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css'],
})
export class PainelPrincipalComponent {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.obterProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  excluirProduto(id: number) {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.deletarProduto(id).subscribe(() => {
        alert('Produto excluído com sucesso!');
        this.listarProdutos();
      });
    }
  }

  editarProduto(id: number) {
    this.router.navigate(['/cadastro-produto', id]);
  }
}*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../servicos/produto.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-painel-principal',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule // ✅ IMPORTADO AQUI
  ],
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css'],
})
export class PainelPrincipalComponent {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.obterProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
      },
      error: (erro) => {
        console.error('Erro ao obter produtos:', erro);
      }
    });
  }  

  excluirProduto(id: number) {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.deletarProduto(id).subscribe(() => {
        alert('Produto excluído com sucesso!');
        this.listarProdutos();
      });
    }
  }

  editarProduto(id: number) {
    this.router.navigate(['/cadastro-produto', id]);
  }
}

