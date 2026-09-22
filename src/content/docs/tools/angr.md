---
title: "angr"
description: "Explore compiled programs with a programmable binary-analysis and symbolic-execution framework."
tool:
  modes: ["Static"]
  inputTypes: ["Binaries"]
  techniques: ["Binary analysis","Symbolic execution"]
  languages: ["Language independent"]
  languageNote: "Targets are supported executable formats and architectures. Python is the scripting interface, not a claim that this entry analyzes Python source."
  targets: ["Native binaries","Firmware"]
  findings: ["Specification violations"]
  findingNote: "You must encode the behavior or failure condition to investigate. Finding a reachable state is not automatically a vulnerability; angr is a framework, not a fixed vulnerability-rule scanner."
  environment: "Python with compatible native dependencies, or the project container. Check wheel availability for the host; a source build can require C/C++ and Rust toolchains."
  setup: "Load a supported binary and configure an entry state, symbolic inputs, environment models, and search goals. Bare-metal targets need additional loader and memory configuration."
  licenseCategory: "Open source"
  license: "BSD-2-Clause for angr; dependencies have separate licenses"
  cost: ["Free"]
  costNote: "Free framework and Python API. No paid tier is required for the documented symbolic-execution workflow."
  website: "https://angr.io/"
  verified: "2026-09-22"
  scope: "Offline binary loading and symbolic execution. Concrete-execution integrations and separate analysis packages are outside this entry's mode tags."
  sources:
    - label: "Binary loading and supported loader concepts"
      url: https://docs.angr.io/en/latest/core-concepts/loading.html
    - label: "Symbolic execution and path exploration"
      url: https://docs.angr.io/en/latest/core-concepts/symbolic.html
    - label: "Installation and native dependencies"
      url: https://docs.angr.io/en/latest/getting-started/installing.html
    - label: "Modeling and analysis pitfalls"
      url: https://docs.angr.io/en/latest/advanced-topics/gotchas.html
    - label: "Symbolic streams and stdin"
      url: https://docs.angr.io/en/latest/advanced-topics/file_system.html
    - label: "Simulation managers and exploration predicates"
      url: https://docs.angr.io/en/latest/core-concepts/pathgroups.html
    - label: "License"
      url: https://github.com/angr/angr/blob/master/LICENSE
---

## When to use it

Choose angr when the question is about behavior inside a compiled artifact and you can write the analysis needed to answer it. For a predefined set of binary weakness checks, compare [cwe-checker](../cwe-checker/).

## Worked example: find an input for a branch

**Illustrative example, not run here.** On a compatible native build host, save `branch_check.c`:

```c
#include <stdio.h>
int main(void) {
    puts(getchar() == 'K' ? "accepted" : "rejected");
    return 0;
}
```

Compile it with `cc -O0 branch_check.c -o branch_check`. In a Python environment with angr installed, run:

```python
import angr
import claripy

project = angr.Project("./branch_check", auto_load_libs=False)
symbol = claripy.BVS("input_byte", 8)
stream = angr.SimFileStream(name="stdin", content=symbol, has_end=True)
state = project.factory.full_init_state(args=["./branch_check"], stdin=stream)
paths = project.factory.simulation_manager(state)
paths.explore(find=lambda candidate: b"accepted" in candidate.posix.dumps(1))

if paths.found:
    print(paths.found[0].posix.dumps(0))
else:
    print("No matching state found in this exploration")
```

The intended witness is the byte `K`. This is a reachability exercise; the branch is not itself a security defect.

## Limits

Models of library calls, startup state, memory, and system behavior affect the result. Many branches can make exploration expensive. Finding no state does not establish impossibility unless the exploration and model justify that conclusion.

Reproduce a witness against the original program before drawing conclusions about concrete behavior.
