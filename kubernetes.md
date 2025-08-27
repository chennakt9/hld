### Pods
Usually 1 app container = 1 pod, but sometimes you add a sidecar container (e.g., logging, proxy)

### Services
Pods come and go, IPs change — Services give them a static IP/name + load balancing.
Types:
ClusterIP (used frequently) → Internal-only access inside the cluster.
NodePort (rarely used) → ...
LoadBalancer (used frequently) → Gets you a cloud load balancer for external traffic. Also we add ingress rules here
ExternalName (rarely used) → ...

### Components
kubectl → apiserver → etcd → controller-manager (ensures count) → scheduler (assigns nodes) → kubelet (runs pods) → reports back to apiserver → repeat forever.

==FLOW==
1. You (kubectl) → Ask the receptionist (apiserver):
“Yo, I want 3 nginx pods.”

2. apiserver → Stores this request in etcd (the filing cabinet).

3. kube-controller-manager → Peeks into the cabinet and says:
“Desired state = 3 pods, actual = 0. Let’s create 3 pods.”
→ It writes new Pod objects via apiserver.

4. kube-scheduler → Sees pods with no node assigned.
“Okay, Pod #1 → Node A, Pod #2 → Node B, Pod #3 → Node C.”
→ It updates the Pod object through apiserver with the node assignment.

5. kubelet on each node → Notices:
“Oh, receptionist says I should run Pod #1 here.”
→ It pulls images, runs containers, updates status back to apiserver.

6. apiserver → Shares updated status to everyone.
Controllers & scheduler keep watching to ensure reality matches the YAML you declared
