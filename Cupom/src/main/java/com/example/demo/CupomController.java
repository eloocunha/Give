package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping("/cupons")
public class CupomController {
    private final CupomService cupomService;

    public CupomController(CupomService cupomService) {
        this.cupomService = cupomService;
    }

    @PostMapping
    public ResponseEntity<Cupom> criarCupom(@RequestBody Cupom cupom) {
        Cupom novoCupom = cupomService.criarCupom(cupom);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCupom);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cupom> buscarCupomPorId(@PathVariable Long id) {
        Cupom cupom = cupomService.buscarCupomPorId(id);
        return ResponseEntity.ok(cupom);
    }
}
