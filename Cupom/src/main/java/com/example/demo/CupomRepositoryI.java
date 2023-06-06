package com.example.demo;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Repository;


@Repository
	public class CupomRepositoryI implements CupomRepository {
	private List<Cupom> cupomList = new ArrayList<>();

	public Cupom save(Cupom cupom) {
		cupomList.add(cupom);
		return cupom;
}
	public void delete(Cupom cupom) {
        cupomList.remove(cupom);
    }

	public Optional<Cupom> findById(Long id) {
	    return cupomList.stream()
	            .filter(cupom -> cupom.getId() == id.intValue())
	            .findFirst();
	}
	
	public List<Cupom> buscar(String nome) {
		return cupomList.stream()
				.filter(cupom -> cupom.getNome().equalsIgnoreCase(nome))
				.collect(Collectors.toList());

}
}
