package com.immunoblock.springboot.crud.trial;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TrialsHardcodedService {

	private static List<Trial> trials = new ArrayList<>();
	private static long idCounter = 0;

	static {
		//trials.add(new Trial(++idCounter, "merck", "alannah moran is the best"));
		trials.add(new Trial(++idCounter, "pfizer", "Covid-19 Remdisivir Trial: Germany"));
		trials.add(new Trial(++idCounter, "merck", "Lung Cancer Candidates: Phase1"));
		trials.add(new Trial(++idCounter, "University College Dublin", "Phase 2 SARS trial: UCD"));
		trials.add(new Trial(++idCounter, "Mater hospital", "EoE Clinical Trial 1: Dublin"));
	}

	public List<Trial> findAll() {
		return trials;
	}

	public Trial save(Trial trial) {
		if (trial.getId() == -1 || trial.getId() == 0) {
			trial.setId(++idCounter);
			trials.add(trial);
		} else {
			deleteById(trial.getId());
			trials.add(trial);
		}
		return trial;
	}

	public Trial deleteById(long id) {
		Trial trial = findById(id);

		if (trial == null)
			return null;

		if (trials.remove(trial)) {
			return trial;
		}

		return null;
	}

	public Trial findById(long id) {
		for (Trial trial : trials) {
			if (trial.getId() == id) {
				return trial;
			}
		}

		return null;
	}
}