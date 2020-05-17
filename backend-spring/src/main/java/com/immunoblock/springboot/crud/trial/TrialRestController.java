package com.immunoblock.springboot.crud.trial;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class TrialRestController {

	@Autowired
	private TrialsHardcodedService trialsManagementService;

	@GetMapping("/sponsor/{username}/trials")
	public List<Trial> getAllTrials(@PathVariable String username) {
		return trialsManagementService.findAll();
	}

	@GetMapping("/sponsor/{username}/trials/{id}")
	public Trial getTrial(@PathVariable String username, @PathVariable long id) {
		return trialsManagementService.findById(id);
	}

	@DeleteMapping("/sponsor/{username}/trials/{id}")
	public ResponseEntity<Void> deleteTrial(@PathVariable String username, @PathVariable long id) {

		Trial trial = trialsManagementService.deleteById(id);

		if (trial != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/sponsor/{username}/trials/{id}")
	public ResponseEntity<Trial> updateTrial(@PathVariable String username, @PathVariable long id,
			@RequestBody Trial trial) {

		Trial trialUpdated = trialsManagementService.save(trial);

		return new ResponseEntity<Trial>(trial, HttpStatus.OK);
	}

	@PostMapping("/sponsor/{username}/trials")
	public ResponseEntity<Void> createTrial(@PathVariable String username, @RequestBody Trial trial) {

		Trial createdTrial = trialsManagementService.save(trial);

		// Get current resource url s{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTrial.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}

}