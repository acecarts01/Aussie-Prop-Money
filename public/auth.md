# Auth.md

Australian Reserve Props — public ecommerce catalog. No authentication is required to browse or read any resource.

## Agent Registration
No registration is needed. All resources below are public.

| Resource | URL |
|---|---|
| Shop | https://thereservenote.com/shop/ |
| Product catalog (API) | https://thereservenote.com/api/products |
| FAQ | https://thereservenote.com/faq/ |
| Wholesale | https://thereservenote.com/wholesale/ |

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

Ordering is human-assisted: an agent may browse products and draft an order, but a human completes payment.
Age restriction: none. This site sells novelty currency only — not legal tender, not a financial product.
